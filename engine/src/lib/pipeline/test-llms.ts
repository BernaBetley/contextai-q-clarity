import { db } from "../db";
import { audits, queries, llmResponses } from "../db/schema";
import { eq } from "drizzle-orm";
import { createAllClients } from "../llm";

export async function testLLMs(auditId: string): Promise<void> {
  const [audit] = await db.select().from(audits).where(eq(audits.id, auditId));
  if (!audit) throw new Error(`Audit ${auditId} not found`);

  const auditQueries = await db
    .select()
    .from(queries)
    .where(eq(queries.auditId, auditId))
    .orderBy(queries.order);

  if (auditQueries.length === 0) {
    throw new Error(`No queries found for audit ${auditId}`);
  }

  const clients = createAllClients({
    openai: process.env.OPENAI_API_KEY!,
    anthropic: process.env.ANTHROPIC_API_KEY!,
    google: process.env.GOOGLE_AI_API_KEY!,
  });

  // Process queries sequentially to respect rate limits.
  // Each query is tested across all 3 LLMs in parallel.
  for (const q of auditQueries) {
    const results = await Promise.allSettled(
      clients.map((client) => client.query(q.queryText))
    );

    const inserts = results
      .map((r) => {
        if (r.status === "rejected") {
          console.error(`LLM call failed for query "${q.queryText}":`, r.reason);
          return null;
        }
        return {
          queryId: q.id,
          llm: r.value.provider as "chatgpt" | "claude" | "gemini",
          responseText: r.value.responseText,
          modelVersion: r.value.modelVersion,
          latencyMs: r.value.latencyMs,
        };
      })
      .filter(Boolean) as {
        queryId: string;
        llm: "chatgpt" | "claude" | "gemini";
        responseText: string;
        modelVersion: string | null;
        latencyMs: number | null;
      }[];

    if (inserts.length > 0) {
      await db.insert(llmResponses).values(inserts);
    }

    // Small delay between queries to respect rate limits
    await new Promise((r) => setTimeout(r, 500));
  }

  await db
    .update(audits)
    .set({ status: "scoring" })
    .where(eq(audits.id, auditId));
}
