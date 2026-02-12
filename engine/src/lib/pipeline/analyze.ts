import Anthropic from "@anthropic-ai/sdk";
import { db } from "../db";
import {
  audits,
  queries,
  llmResponses,
  scores,
  competitorResults,
  reports,
} from "../db/schema";
import { eq } from "drizzle-orm";

const ANALYSIS_SYSTEM = `You are a senior AI visibility strategist — think McKinsey clarity, no fluff.

You will receive the complete scoring data for an AI visibility audit. Produce three outputs:

## 1. Executive Summary (max 300 words)
One-page snapshot for leadership. Cover:
- Overall visibility posture (strong / moderate / weak / absent)
- Biggest risk (invisibility, inaccuracy, or displacement)
- Top-line numbers: overall score, share-of-voice, hallucination count
- The single most important action to take

## 2. Root-Cause Analysis (max 500 words)
Why gaps exist. Structure as:
- **Content gaps**: Missing or poorly structured content that AI can't cite
- **Authority gaps**: Lack of third-party references, backlinks, schema markup
- **Citation gaps**: Sources exist but AI isn't finding or attributing them
- **Competitive factors**: What competitors are doing that the brand isn't

## 3. Action Roadmap (JSON array)
Prioritized actions. Each action has:
- action: What to do (specific, actionable)
- rationale: Why this matters (tied to data)
- impact: "high" | "medium" | "low"
- effort: "low" | "medium" | "high"
- priority: number (1 = highest)
- category: "quick_win" (high impact, low effort) | "structural" (high impact, high effort) | "strategic" (long-term)

Target 8-12 actions. Quick wins first.

Return JSON:
{
  "executive_summary": "...",
  "root_cause_analysis": "...",
  "roadmap": [...]
}

Return ONLY the JSON object.`;

export async function analyze(auditId: string): Promise<void> {
  const [audit] = await db.select().from(audits).where(eq(audits.id, auditId));
  if (!audit) throw new Error(`Audit ${auditId} not found`);

  // Gather all data
  const auditQueries = await db
    .select()
    .from(queries)
    .where(eq(queries.auditId, auditId))
    .orderBy(queries.order);

  const allData: {
    query: string;
    category: string;
    responses: {
      llm: string;
      score: number;
      appearance: number;
      prominence: number;
      accuracy: number;
      hallucinations: unknown[];
      citations: unknown[];
      competitors: { name: string; mentioned: boolean; position: string | null }[];
      notes: string | null;
    }[];
  }[] = [];

  for (const q of auditQueries) {
    const responses = await db
      .select()
      .from(llmResponses)
      .where(eq(llmResponses.queryId, q.id));

    const responseData = [];
    for (const resp of responses) {
      const [score] = await db
        .select()
        .from(scores)
        .where(eq(scores.llmResponseId, resp.id));

      const compResults = await db
        .select()
        .from(competitorResults)
        .where(eq(competitorResults.llmResponseId, resp.id));

      responseData.push({
        llm: resp.llm,
        score: score?.total ?? 0,
        appearance: score?.appearance ?? 0,
        prominence: score?.prominence ?? 0,
        accuracy: score?.accuracy ?? 0,
        hallucinations: score?.hallucinations ?? [],
        citations: score?.citations ?? [],
        competitors: compResults.map((c) => ({
          name: c.competitorName,
          mentioned: c.mentioned,
          position: c.position,
        })),
        notes: score?.notes ?? null,
      });
    }

    allData.push({
      query: q.queryText,
      category: q.category,
      responses: responseData,
    });
  }

  // Calculate KPIs
  const totalResponses = allData.flatMap((d) => d.responses);
  const totalQueries = allData.length;
  const queriesWithAppearance = allData.filter((d) =>
    d.responses.some((r) => r.appearance > 0)
  ).length;

  const allHallucinations = totalResponses.flatMap(
    (r) => r.hallucinations as { claim: string }[]
  );
  const allCitations = totalResponses.flatMap(
    (r) => r.citations as { type: string }[]
  );
  const directCitations = allCitations.filter((c) => c.type === "direct");

  const avgAccuracy =
    totalResponses.length > 0
      ? totalResponses.reduce((sum, r) => sum + r.accuracy, 0) /
        totalResponses.length
      : 0;

  // Competitive displacement: queries where at least one competitor appears but brand doesn't
  const displacedQueries = allData.filter(
    (d) =>
      d.responses.every((r) => r.appearance === 0) &&
      d.responses.some((r) => r.competitors.some((c) => c.mentioned))
  ).length;

  const kpis = {
    shareOfVoice: Math.round((queriesWithAppearance / totalQueries) * 100),
    citationRate:
      totalResponses.length > 0
        ? Math.round((directCitations.length / totalResponses.length) * 100)
        : 0,
    accuracyScore: Math.round((avgAccuracy / 30) * 100),
    hallucinationCount: allHallucinations.length,
    competitiveDisplacement: Math.round(
      (displacedQueries / totalQueries) * 100
    ),
  };

  const overallScore =
    totalResponses.length > 0
      ? Math.round(
          totalResponses.reduce((sum, r) => sum + r.score, 0) /
            totalResponses.length
        )
      : 0;

  // Generate analysis with AI
  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY! });

  const userPrompt = `Company: ${audit.companyName}
Industry: ${audit.industry}
Competitors: ${audit.competitors?.map((c) => c.name).join(", ")}

KPIs:
- Share of Voice: ${kpis.shareOfVoice}%
- Citation Rate: ${kpis.citationRate}%
- Accuracy Score: ${kpis.accuracyScore}%
- Hallucination Count: ${kpis.hallucinationCount}
- Competitive Displacement: ${kpis.competitiveDisplacement}%
- Overall Score: ${overallScore}/100

Full scoring data:
${JSON.stringify(allData, null, 2)}`;

  const result = await client.messages.create({
    model: "claude-sonnet-4-5-20250929",
    max_tokens: 4096,
    system: ANALYSIS_SYSTEM,
    messages: [{ role: "user", content: userPrompt }],
  });

  const text = result.content
    .filter((b) => b.type === "text")
    .map((b) => b.text)
    .join("");

  const parsed = JSON.parse(text) as {
    executive_summary: string;
    root_cause_analysis: string;
    roadmap: {
      action: string;
      rationale: string;
      impact: "high" | "medium" | "low";
      effort: "low" | "medium" | "high";
      priority: number;
      category: "quick_win" | "structural" | "strategic";
    }[];
  };

  // Save report
  await db.insert(reports).values({
    auditId,
    executiveSummary: parsed.executive_summary,
    rootCauseAnalysis: parsed.root_cause_analysis,
    roadmap: parsed.roadmap,
  });

  // Update audit with KPIs and score
  await db
    .update(audits)
    .set({
      status: "generating_report",
      overallScore,
      kpis,
    })
    .where(eq(audits.id, auditId));
}
