import Anthropic from "@anthropic-ai/sdk";
import { db } from "../db";
import {
  audits,
  queries,
  llmResponses,
  scores,
  competitorResults,
} from "../db/schema";
import { eq } from "drizzle-orm";

const SCORING_SYSTEM = `You are an expert AI visibility analyst. Score how a brand appears in an AI-generated response.

You will receive:
- The brand name and fact sheet
- The competitor names
- The query that was asked
- The AI response

Score the response on three dimensions:

**Appearance (0-40):**
0 = Brand not mentioned at all
10 = Brand mentioned in passing ("there are also companies like X")
20 = Brand listed among several options
30 = Brand described with detail
40 = Brand featured or recommended prominently

**Prominence (0-30):**
0 = Not present
10 = Mentioned in bottom half of response
20 = Mentioned in first half of response
30 = First mentioned or top recommendation

**Accuracy (0-30):**
0 = Major hallucinations or completely wrong info about brand
10 = Significant inaccuracies about the brand
20 = Mostly accurate, minor errors
30 = Fully accurate against provided fact sheet (or N/A if brand not mentioned — score 0 in that case)

Also identify:
- **Hallucinations**: Any false claims about the brand. Classify severity: "critical" (totally wrong), "major" (misleading), "minor" (imprecise).
- **Citations**: Any sources mentioned or linked. Type: "direct" (links to brand), "indirect" (links to third-party mentioning brand), "none".
- **Competitor presence**: For each competitor, note if they appear, their position, and a brief context snippet.

Return JSON:
{
  "appearance": <number>,
  "prominence": <number>,
  "accuracy": <number>,
  "total": <number>,
  "hallucinations": [{"claim": "...", "severity": "critical|major|minor", "evidence": "..."}],
  "citations": [{"source": "...", "url": null, "type": "direct|indirect|none"}],
  "notes": "Brief assessment",
  "competitors": [{"name": "...", "mentioned": true/false, "position": "featured|first_mention|listed|passing|not_present", "context_snippet": "..."}]
}

Return ONLY the JSON object.`;

interface ScoringResult {
  appearance: number;
  prominence: number;
  accuracy: number;
  total: number;
  hallucinations: { claim: string; severity: "critical" | "major" | "minor"; evidence: string }[];
  citations: { source: string; url: string | null; type: "direct" | "indirect" | "none" }[];
  notes: string;
  competitors: {
    name: string;
    mentioned: boolean;
    position: "featured" | "first_mention" | "listed" | "passing" | "not_present";
    context_snippet: string;
  }[];
}

export async function scoreResponses(auditId: string): Promise<void> {
  const [audit] = await db.select().from(audits).where(eq(audits.id, auditId));
  if (!audit) throw new Error(`Audit ${auditId} not found`);

  const auditQueries = await db
    .select()
    .from(queries)
    .where(eq(queries.auditId, auditId));

  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY! });
  const competitorNames = audit.competitors?.map((c) => c.name) ?? [];

  for (const q of auditQueries) {
    const responses = await db
      .select()
      .from(llmResponses)
      .where(eq(llmResponses.queryId, q.id));

    for (const resp of responses) {
      const userPrompt = `Brand: ${audit.companyName}
Fact sheet:
${audit.factSheet ?? "No fact sheet provided."}

Competitors: ${competitorNames.join(", ")}

Query: "${q.queryText}"
LLM: ${resp.llm}

Response:
---
${resp.responseText}
---`;

      const result = await client.messages.create({
        model: "claude-sonnet-4-5-20250929",
        max_tokens: 2048,
        system: SCORING_SYSTEM,
        messages: [{ role: "user", content: userPrompt }],
      });

      const text = result.content
        .filter((b) => b.type === "text")
        .map((b) => b.text)
        .join("");

      const parsed: ScoringResult = JSON.parse(text);

      // Insert score
      await db.insert(scores).values({
        llmResponseId: resp.id,
        appearance: parsed.appearance,
        prominence: parsed.prominence,
        accuracy: parsed.accuracy,
        total: parsed.total,
        hallucinations: parsed.hallucinations,
        citations: parsed.citations,
        notes: parsed.notes,
      });

      // Insert competitor results
      if (parsed.competitors.length > 0) {
        await db.insert(competitorResults).values(
          parsed.competitors.map((c) => ({
            llmResponseId: resp.id,
            competitorName: c.name,
            mentioned: c.mentioned,
            position: c.position,
            contextSnippet: c.context_snippet,
          }))
        );
      }

      // Small delay for rate limiting
      await new Promise((r) => setTimeout(r, 300));
    }
  }

  await db
    .update(audits)
    .set({ status: "analyzing" })
    .where(eq(audits.id, auditId));
}
