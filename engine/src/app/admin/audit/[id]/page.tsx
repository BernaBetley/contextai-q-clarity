import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import {
  audits,
  queries,
  llmResponses,
  scores,
  reports,
} from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { format } from "date-fns";
import { RunPipelineButton } from "./RunButton";

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    payment_received: "badge-pending",
    intake_pending: "badge-pending",
    intake_complete: "badge-pending",
    generating_queries: "badge-running",
    testing_llms: "badge-running",
    scoring: "badge-running",
    analyzing: "badge-running",
    generating_report: "badge-running",
    complete: "badge-success",
    failed: "badge-error",
  };
  return (
    <span className={`badge ${styles[status] ?? "badge-pending"}`}>
      {status.replace(/_/g, " ")}
    </span>
  );
}

function ScoreCell({ value, max }: { value: number; max: number }) {
  const pct = (value / max) * 100;
  const color =
    pct >= 70
      ? "text-green-700 bg-green-50"
      : pct >= 40
        ? "text-amber-700 bg-amber-50"
        : "text-red-700 bg-red-50";
  return (
    <span
      className={`inline-block px-2 py-0.5 rounded text-xs font-mono font-medium ${color}`}
    >
      {value}
    </span>
  );
}

export default async function AuditDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const [audit] = await db
    .select()
    .from(audits)
    .where(eq(audits.id, params.id));

  if (!audit) notFound();

  const auditQueries = await db
    .select()
    .from(queries)
    .where(eq(queries.auditId, params.id))
    .orderBy(queries.order);

  const [report] = await db
    .select()
    .from(reports)
    .where(eq(reports.auditId, params.id));

  // Build scorecard data
  const scorecard: {
    query: string;
    category: string;
    scores: Record<string, { total: number; appearance: number; prominence: number; accuracy: number }>;
  }[] = [];

  for (const q of auditQueries) {
    const responses = await db
      .select()
      .from(llmResponses)
      .where(eq(llmResponses.queryId, q.id));

    const queryScores: Record<
      string,
      { total: number; appearance: number; prominence: number; accuracy: number }
    > = {};

    for (const resp of responses) {
      const [score] = await db
        .select()
        .from(scores)
        .where(eq(scores.llmResponseId, resp.id));

      if (score) {
        queryScores[resp.llm] = {
          total: score.total,
          appearance: score.appearance,
          prominence: score.prominence,
          accuracy: score.accuracy,
        };
      }
    }

    scorecard.push({
      query: q.queryText,
      category: q.category,
      scores: queryScores,
    });
  }

  return (
    <>
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <Link
            href="/admin"
            className="text-xs text-surface-500 hover:text-surface-700 mb-2 inline-block"
          >
            ← Back to dashboard
          </Link>
          <h1 className="text-2xl font-semibold">
            {audit.companyName ?? "Untitled audit"}
          </h1>
          <div className="flex items-center gap-3 mt-2">
            <StatusBadge status={audit.status} />
            <span className="text-sm text-surface-500">
              {format(new Date(audit.createdAt), "d MMM yyyy, HH:mm")}
            </span>
            {audit.clientEmail && (
              <span className="text-sm text-surface-500">
                · {audit.clientEmail}
              </span>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          {report?.pdfUrl && (
            <a
              href={report.pdfUrl}
              target="_blank"
              className="btn btn-secondary"
            >
              Download PDF
            </a>
          )}
          <Link
            href={`/report/${params.id}`}
            target="_blank"
            className="btn btn-secondary"
          >
            View report
          </Link>
          <RunPipelineButton auditId={params.id} />
        </div>
      </div>

      {/* KPIs */}
      {audit.kpis && (
        <div className="grid grid-cols-5 gap-4 mb-8">
          {[
            { label: "Overall", value: `${audit.overallScore}/100` },
            { label: "Share of Voice", value: `${audit.kpis.shareOfVoice}%` },
            { label: "Citation Rate", value: `${audit.kpis.citationRate}%` },
            { label: "Accuracy", value: `${audit.kpis.accuracyScore}%` },
            {
              label: "Hallucinations",
              value: audit.kpis.hallucinationCount,
            },
          ].map((kpi) => (
            <div key={kpi.label} className="card">
              <p className="text-xs text-surface-500 uppercase tracking-wider">
                {kpi.label}
              </p>
              <p className="text-2xl font-semibold mt-1 font-mono">
                {kpi.value}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Failure reason */}
      {audit.status === "failed" && audit.failureReason && (
        <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-8">
          <p className="text-sm font-medium text-red-800">Pipeline failed</p>
          <p className="text-sm text-red-700 mt-1 font-mono">
            {audit.failureReason}
          </p>
        </div>
      )}

      {/* Executive Summary */}
      {report?.executiveSummary && (
        <div className="card mb-8">
          <h2 className="text-sm font-semibold text-surface-500 uppercase tracking-wider mb-3">
            Executive Summary
          </h2>
          <div className="prose prose-sm max-w-none text-surface-700">
            {report.executiveSummary.split("\n").map((line, i) => (
              <p key={i}>{line}</p>
            ))}
          </div>
        </div>
      )}

      {/* Scorecard */}
      {scorecard.length > 0 && (
        <div className="card p-0 overflow-hidden mb-8">
          <div className="px-6 py-4 border-b border-surface-200">
            <h2 className="text-sm font-semibold text-surface-500 uppercase tracking-wider">
              Visibility Scorecard
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th className="w-8">#</th>
                  <th>Query</th>
                  <th>Category</th>
                  <th className="text-center">ChatGPT</th>
                  <th className="text-center">Claude</th>
                  <th className="text-center">Gemini</th>
                </tr>
              </thead>
              <tbody>
                {scorecard.map((row, i) => (
                  <tr key={i}>
                    <td className="text-surface-400 font-mono text-xs">
                      {i + 1}
                    </td>
                    <td className="text-sm max-w-md truncate">{row.query}</td>
                    <td>
                      <span className="text-xs text-surface-500 bg-surface-100 px-2 py-0.5 rounded">
                        {row.category}
                      </span>
                    </td>
                    <td className="text-center">
                      {row.scores.chatgpt ? (
                        <ScoreCell
                          value={row.scores.chatgpt.total}
                          max={100}
                        />
                      ) : (
                        "—"
                      )}
                    </td>
                    <td className="text-center">
                      {row.scores.claude ? (
                        <ScoreCell
                          value={row.scores.claude.total}
                          max={100}
                        />
                      ) : (
                        "—"
                      )}
                    </td>
                    <td className="text-center">
                      {row.scores.gemini ? (
                        <ScoreCell
                          value={row.scores.gemini.total}
                          max={100}
                        />
                      ) : (
                        "—"
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Roadmap */}
      {report?.roadmap && (report.roadmap as unknown[]).length > 0 && (
        <div className="card p-0 overflow-hidden mb-8">
          <div className="px-6 py-4 border-b border-surface-200">
            <h2 className="text-sm font-semibold text-surface-500 uppercase tracking-wider">
              Action Roadmap
            </h2>
          </div>
          <table className="table">
            <thead>
              <tr>
                <th className="w-8">P</th>
                <th>Action</th>
                <th>Impact</th>
                <th>Effort</th>
                <th>Type</th>
              </tr>
            </thead>
            <tbody>
              {(
                report.roadmap as {
                  action: string;
                  rationale: string;
                  impact: string;
                  effort: string;
                  priority: number;
                  category: string;
                }[]
              ).map((item, i) => (
                <tr key={i}>
                  <td className="font-mono font-semibold text-surface-400">
                    {item.priority}
                  </td>
                  <td>
                    <p className="text-sm font-medium">{item.action}</p>
                    <p className="text-xs text-surface-500 mt-0.5">
                      {item.rationale}
                    </p>
                  </td>
                  <td>
                    <span
                      className={`text-xs font-medium ${
                        item.impact === "high"
                          ? "text-green-700"
                          : item.impact === "medium"
                            ? "text-amber-700"
                            : "text-surface-500"
                      }`}
                    >
                      {item.impact}
                    </span>
                  </td>
                  <td>
                    <span
                      className={`text-xs font-medium ${
                        item.effort === "low"
                          ? "text-green-700"
                          : item.effort === "medium"
                            ? "text-amber-700"
                            : "text-red-700"
                      }`}
                    >
                      {item.effort}
                    </span>
                  </td>
                  <td>
                    <span className="text-xs bg-surface-100 px-2 py-0.5 rounded">
                      {item.category.replace("_", " ")}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Audit metadata */}
      <div className="card">
        <h2 className="text-sm font-semibold text-surface-500 uppercase tracking-wider mb-3">
          Audit Details
        </h2>
        <dl className="grid grid-cols-2 gap-x-8 gap-y-3 text-sm">
          <div>
            <dt className="text-surface-500">Company</dt>
            <dd className="font-medium">{audit.companyName ?? "—"}</dd>
          </div>
          <div>
            <dt className="text-surface-500">Website</dt>
            <dd className="font-medium">{audit.companyWebsite ?? "—"}</dd>
          </div>
          <div>
            <dt className="text-surface-500">Industry</dt>
            <dd className="font-medium">{audit.industry ?? "—"}</dd>
          </div>
          <div>
            <dt className="text-surface-500">Target audience</dt>
            <dd className="font-medium">{audit.targetAudience ?? "—"}</dd>
          </div>
          <div className="col-span-2">
            <dt className="text-surface-500">Competitors</dt>
            <dd className="font-medium">
              {audit.competitors?.map((c) => c.name).join(", ") ?? "—"}
            </dd>
          </div>
          {audit.stripePaymentId && (
            <div>
              <dt className="text-surface-500">Stripe Payment</dt>
              <dd className="font-mono text-xs">{audit.stripePaymentId}</dd>
            </div>
          )}
        </dl>
      </div>
    </>
  );
}
