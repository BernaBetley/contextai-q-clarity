import Anthropic from "@anthropic-ai/sdk";
import { db } from "../db";
import { audits, queries } from "../db/schema";
import { eq } from "drizzle-orm";

const SYSTEM_PROMPT = `You are an expert in AI visibility measurement. Your task is to generate 20 strategic search queries that a potential buyer would type into an AI assistant (ChatGPT, Claude, Gemini) when researching solutions in this company's category.

The queries must be realistic — the kind of thing a decision-maker actually asks an AI, not keyword-stuffed SEO phrases.

Generate exactly 20 queries across 4 categories (5 each):

**Brand (5):** Queries that directly reference the company or where the company should naturally appear.
Examples: "What is [Company]?", "[Company] vs [Competitor]", "[Company] reviews", "[Company] pricing"

**Category (5):** Queries about the product category where the company should be recommended.
Examples: "Best [category] tools for [audience]", "[category] comparison 2025", "Top [category] platforms"

**Use-case (5):** Queries about specific problems the company solves.
Examples: "How to [solve problem]", "Best way to [achieve outcome]", "Tools for [specific workflow]"

**Competitive (5):** Queries involving competitors where the company should appear as an alternative.
Examples: "[Competitor] alternatives", "[Competitor] vs", "Companies like [Competitor]"

Return a JSON array with exactly 20 objects:
[{"text": "the query", "category": "brand|category|use_case|competitive", "order": 1}]

Return ONLY the JSON array, no other text.`;

export async function generateQueries(auditId: string): Promise<void> {
  const [audit] = await db.select().from(audits).where(eq(audits.id, auditId));
  if (!audit) throw new Error(`Audit ${auditId} not found`);

  const competitorNames =
    audit.competitors?.map((c) => c.name).join(", ") ?? "N/A";

  const userPrompt = `Company: ${audit.companyName}
Website: ${audit.companyWebsite}
Industry: ${audit.industry}
Description: ${audit.companyDescription}
Target audience: ${audit.targetAudience}
Competitors: ${competitorNames}
Priority topics: ${audit.priorityTopics ?? "N/A"}
Additional context: ${audit.additionalContext ?? "N/A"}`;

  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY! });

  const response = await client.messages.create({
    model: "claude-sonnet-4-5-20250929",
    max_tokens: 4096,
    system: SYSTEM_PROMPT,
    messages: [{ role: "user", content: userPrompt }],
  });

  const text = response.content
    .filter((b) => b.type === "text")
    .map((b) => b.text)
    .join("");

  const parsed = JSON.parse(text) as {
    text: string;
    category: "brand" | "category" | "use_case" | "competitive";
    order: number;
  }[];

  if (parsed.length !== 20) {
    throw new Error(`Expected 20 queries, got ${parsed.length}`);
  }

  await db.insert(queries).values(
    parsed.map((q) => ({
      auditId,
      queryText: q.text,
      category: q.category,
      order: q.order,
    }))
  );

  await db
    .update(audits)
    .set({ status: "testing_llms" })
    .where(eq(audits.id, auditId));
}
