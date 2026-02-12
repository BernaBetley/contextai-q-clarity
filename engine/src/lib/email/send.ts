import { Resend } from "resend";
import { db } from "../db";
import { audits, reports } from "../db/schema";
import { eq } from "drizzle-orm";

export async function sendReportEmail(auditId: string): Promise<void> {
  const [audit] = await db.select().from(audits).where(eq(audits.id, auditId));
  if (!audit) throw new Error(`Audit ${auditId} not found`);
  if (!audit.clientEmail) throw new Error(`No client email for audit ${auditId}`);

  const [report] = await db
    .select()
    .from(reports)
    .where(eq(reports.auditId, auditId));
  if (!report) throw new Error(`No report for audit ${auditId}`);

  const resend = new Resend(process.env.RESEND_API_KEY!);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const reportUrl = `${siteUrl}/report/${auditId}`;

  await resend.emails.send({
    from: process.env.FROM_EMAIL!,
    to: audit.clientEmail,
    subject: `Your AI Visibility Audit is ready — ${audit.companyName}`,
    html: `
      <div style="font-family: Inter, system-ui, sans-serif; max-width: 600px; margin: 0 auto; color: #212529;">
        <h1 style="font-size: 24px; margin-bottom: 8px;">Your audit is complete</h1>
        <p style="color: #495057; font-size: 16px; line-height: 1.6;">
          Hi ${audit.clientName ?? "there"},
        </p>
        <p style="color: #495057; font-size: 16px; line-height: 1.6;">
          Your AI Visibility Audit for <strong>${audit.companyName}</strong> is ready.
          Here's a quick snapshot:
        </p>

        <div style="background: #f8f9fa; border-radius: 8px; padding: 24px; margin: 24px 0;">
          <p style="margin: 0 0 8px; font-size: 14px; color: #868e96; text-transform: uppercase; letter-spacing: 0.05em;">
            Overall Score
          </p>
          <p style="margin: 0; font-size: 48px; font-weight: 700;">
            ${audit.overallScore ?? "—"}<span style="font-size: 20px; color: #868e96;">/100</span>
          </p>
        </div>

        <table style="width: 100%; border-collapse: collapse; margin: 24px 0;">
          <tr>
            <td style="padding: 8px 0; color: #495057;">Share of Voice</td>
            <td style="padding: 8px 0; text-align: right; font-weight: 600;">${audit.kpis?.shareOfVoice ?? "—"}%</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #495057;">Accuracy Score</td>
            <td style="padding: 8px 0; text-align: right; font-weight: 600;">${audit.kpis?.accuracyScore ?? "—"}%</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #495057;">Hallucinations Found</td>
            <td style="padding: 8px 0; text-align: right; font-weight: 600;">${audit.kpis?.hallucinationCount ?? "—"}</td>
          </tr>
        </table>

        <a href="${reportUrl}" style="display: inline-block; background: #212529; color: #fff; padding: 14px 28px; border-radius: 6px; text-decoration: none; font-weight: 600; font-size: 16px;">
          View full report
        </a>

        <p style="color: #868e96; font-size: 14px; margin-top: 32px; line-height: 1.6;">
          The full report includes your visibility scorecard, competitive matrix,
          evidence archive, root-cause analysis, and prioritized action roadmap.
        </p>

        <hr style="border: none; border-top: 1px solid #e9ecef; margin: 32px 0;" />
        <p style="color: #adb5bd; font-size: 12px;">
          ContextAI Q · AI Visibility Audit
        </p>
      </div>
    `,
  });
}
