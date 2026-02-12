import { inngest } from "./client";
import { generateQueries } from "../pipeline/generate-queries";
import { testLLMs } from "../pipeline/test-llms";
import { scoreResponses } from "../pipeline/score-responses";
import { analyze } from "../pipeline/analyze";
import { generateReportPdf } from "../pdf/generate";
import { sendReportEmail } from "../email/send";
import { db } from "../db";
import { audits } from "../db/schema";
import { eq } from "drizzle-orm";

export const auditPipeline = inngest.createFunction(
  {
    id: "audit-pipeline",
    retries: 1,
    onFailure: async ({ event }) => {
      const auditId = event.data.event.data.auditId as string;
      if (auditId) {
        await db
          .update(audits)
          .set({
            status: "failed",
            failureReason: String(event.data.error),
          })
          .where(eq(audits.id, auditId));
      }
    },
  },
  { event: "audit/intake.completed" },
  async ({ event, step }) => {
    const { auditId } = event.data;

    // Phase 1: Generate 20 strategic queries
    await step.run("generate-queries", async () => {
      await db
        .update(audits)
        .set({ status: "generating_queries" })
        .where(eq(audits.id, auditId));
      await generateQueries(auditId);
    });

    // Phase 2: Test across ChatGPT, Claude, Gemini
    await step.run("test-llms", async () => {
      await testLLMs(auditId);
    });

    // Phase 3: Score every response
    await step.run("score-responses", async () => {
      await scoreResponses(auditId);
    });

    // Phase 4: Executive summary + root-cause + roadmap
    await step.run("analyze", async () => {
      await analyze(auditId);
    });

    // Phase 5: Generate PDF report
    await step.run("generate-pdf", async () => {
      await generateReportPdf(auditId);
    });

    // Phase 6: Send to client
    await step.run("send-report", async () => {
      await sendReportEmail(auditId);
      await db
        .update(audits)
        .set({ status: "complete", completedAt: new Date() })
        .where(eq(audits.id, auditId));
    });

    return { auditId, status: "complete" };
  }
);

export const functions = [auditPipeline];
