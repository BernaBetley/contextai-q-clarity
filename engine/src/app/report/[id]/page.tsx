import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import {
  audits,
  queries,
  llmResponses,
  scores,
  competitorResults,
  reports,
} from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { format } from "date-fns";

// Types for structured data
interface ScorecardRow {
  order: number;
  query: string;
  category: string;
  scores: Record<
    string,
    {
      total: number;
      appearance: number;
      prominence: number;
      accuracy: number;
      hallucinations: { claim: string; severity: string; evidence: string }[];
      responseText: string;
    }
  >;
}

interface CompetitorMatrix {
  query: string;
  data: Record<string, Record<string, { mentioned: boolean; position: string | null }>>;
}

interface RoadmapItem {
  action: string;
  rationale: string;
  impact: "high" | "medium" | "low";
  effort: "low" | "medium" | "high";
  priority: number;
  category: "quick_win" | "structural" | "strategic";
}

function ScorePill({ value }: { value: number }) {
  const bg =
    value >= 70
      ? "bg-green-600"
      : value >= 40
        ? "bg-amber-500"
        : value > 0
          ? "bg-red-500"
          : "bg-surface-300";
  return (
    <span
      className={`inline-block w-10 text-center py-0.5 rounded text-xs font-mono font-semibold text-white ${bg}`}
    >
      {value}
    </span>
  );
}

function ImpactBadge({ level }: { level: string }) {
  const color =
    level === "high"
      ? "text-green-700 bg-green-50 border-green-200"
      : level === "medium"
        ? "text-amber-700 bg-amber-50 border-amber-200"
        : "text-surface-600 bg-surface-50 border-surface-200";
  return (
    <span className={`inline-block px-2 py-0.5 rounded border text-xs font-medium ${color}`}>
      {level}
    </span>
  );
}

export default async function ReportPage({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { format?: string };
}) {
  const isPdf = searchParams.format === "pdf";

  const [audit] = await db.select().from(audits).where(eq(audits.id, params.id));
  if (!audit) notFound();

  const [report] = await db.select().from(reports).where(eq(reports.auditId, params.id));

  const auditQueries = await db
    .select()
    .from(queries)
    .where(eq(queries.auditId, params.id))
    .orderBy(queries.order);

  // Build scorecard
  const scorecard: ScorecardRow[] = [];
  const competitorMatrix: CompetitorMatrix[] = [];

  for (const q of auditQueries) {
    const responses = await db
      .select()
      .from(llmResponses)
      .where(eq(llmResponses.queryId, q.id));

    const queryScores: ScorecardRow["scores"] = {};
    const compData: Record<string, Record<string, { mentioned: boolean; position: string | null }>> = {};

    for (const resp of responses) {
      const [score] = await db.select().from(scores).where(eq(scores.llmResponseId, resp.id));
      const compResults = await db
        .select()
        .from(competitorResults)
        .where(eq(competitorResults.llmResponseId, resp.id));

      if (score) {
        queryScores[resp.llm] = {
          total: score.total,
          appearance: score.appearance,
          prominence: score.prominence,
          accuracy: score.accuracy,
          hallucinations: (score.hallucinations ?? []) as { claim: string; severity: string; evidence: string }[],
          responseText: resp.responseText,
        };
      }

      for (const cr of compResults) {
        if (!compData[cr.competitorName]) compData[cr.competitorName] = {};
        compData[cr.competitorName][resp.llm] = {
          mentioned: cr.mentioned,
          position: cr.position,
        };
      }
    }

    scorecard.push({
      order: q.order,
      query: q.queryText,
      category: q.category,
      scores: queryScores,
    });

    competitorMatrix.push({ query: q.queryText, data: compData });
  }

  // Collect all hallucinations
  const allHallucinations = scorecard.flatMap((row) =>
    Object.entries(row.scores).flatMap(([llm, data]) =>
      data.hallucinations.map((h) => ({
        query: row.query,
        llm,
        ...h,
      }))
    )
  );

  const roadmap = (report?.roadmap ?? []) as RoadmapItem[];
  const competitorNames = audit.competitors?.map((c) => c.name) ?? [];
  const llms = ["chatgpt", "claude", "gemini"];
  const llmLabels: Record<string, string> = {
    chatgpt: "ChatGPT",
    claude: "Claude",
    gemini: "Gemini",
  };

  return (
    <div
      className={`min-h-screen bg-white ${isPdf ? "text-[11px]" : "text-sm"}`}
      style={isPdf ? { width: "210mm" } : undefined}
    >
      <div className={`max-w-4xl mx-auto ${isPdf ? "px-0 py-4" : "px-8 py-12"}`}>
        {/* Cover */}
        <header className="mb-12 pb-8 border-b-2 border-surface-900">
          <p className="text-xs text-surface-500 uppercase tracking-widest mb-4">
            ContextAI Q
          </p>
          <h1 className="text-3xl font-semibold mb-2">
            AI Visibility Audit
          </h1>
          <p className="text-xl text-surface-600 mb-6">
            {audit.companyName}
          </p>
          <div className="flex gap-8 text-xs text-surface-500">
            <span>
              {format(
                new Date(audit.completedAt ?? audit.createdAt),
                "d MMMM yyyy"
              )}
            </span>
            <span>20 queries · 3 LLMs · 3 competitors</span>
            <span>{audit.industry}</span>
          </div>
        </header>

        {/* KPI Summary */}
        <section className="mb-12">
          <h2 className="text-xs font-semibold text-surface-500 uppercase tracking-widest mb-4">
            Key Metrics
          </h2>
          <div className="grid grid-cols-5 gap-4">
            {[
              { label: "Overall Score", value: `${audit.overallScore ?? "—"}`, unit: "/100" },
              { label: "Share of Voice", value: `${audit.kpis?.shareOfVoice ?? "—"}`, unit: "%" },
              { label: "Citation Rate", value: `${audit.kpis?.citationRate ?? "—"}`, unit: "%" },
              { label: "Accuracy", value: `${audit.kpis?.accuracyScore ?? "—"}`, unit: "%" },
              { label: "Hallucinations", value: `${audit.kpis?.hallucinationCount ?? "—"}`, unit: "" },
            ].map((kpi) => (
              <div
                key={kpi.label}
                className="border border-surface-200 rounded-lg p-4 text-center"
              >
                <p className="text-xs text-surface-500 mb-1">{kpi.label}</p>
                <p className="text-2xl font-semibold font-mono">
                  {kpi.value}
                  <span className="text-sm text-surface-400">{kpi.unit}</span>
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Executive Summary */}
        {report?.executiveSummary && (
          <section className="mb-12" style={isPdf ? { pageBreakInside: "avoid" } : undefined}>
            <h2 className="text-xs font-semibold text-surface-500 uppercase tracking-widest mb-4">
              Executive Summary
            </h2>
            <div className="bg-surface-50 rounded-lg p-6 leading-relaxed text-surface-700">
              {report.executiveSummary.split("\n").map((line, i) =>
                line.trim() ? <p key={i} className="mb-3 last:mb-0">{line}</p> : null
              )}
            </div>
          </section>
        )}

        {/* Visibility Scorecard */}
        <section className="mb-12">
          <h2 className="text-xs font-semibold text-surface-500 uppercase tracking-widest mb-4">
            Visibility Scorecard
          </h2>
          <div className="overflow-x-auto border border-surface-200 rounded-lg">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-surface-50">
                  <th className="text-left px-3 py-2 font-semibold w-8">#</th>
                  <th className="text-left px-3 py-2 font-semibold">Query</th>
                  <th className="text-left px-3 py-2 font-semibold w-16">Type</th>
                  {llms.map((llm) => (
                    <th key={llm} className="text-center px-3 py-2 font-semibold w-20">
                      {llmLabels[llm]}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {scorecard.map((row) => (
                  <tr key={row.order} className="border-t border-surface-100">
                    <td className="px-3 py-2 text-surface-400 font-mono">{row.order}</td>
                    <td className="px-3 py-2">{row.query}</td>
                    <td className="px-3 py-2">
                      <span className="text-surface-500">{row.category.replace("_", " ")}</span>
                    </td>
                    {llms.map((llm) => (
                      <td key={llm} className="px-3 py-2 text-center">
                        {row.scores[llm] ? (
                          <ScorePill value={row.scores[llm].total} />
                        ) : (
                          <span className="text-surface-300">—</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-surface-400 mt-2">
            Score 0–100: Appearance (0–40) + Prominence (0–30) + Accuracy (0–30)
          </p>
        </section>

        {/* Competitive Matrix */}
        {competitorNames.length > 0 && (
          <section className="mb-12">
            <h2 className="text-xs font-semibold text-surface-500 uppercase tracking-widest mb-4">
              Competitive Matrix
            </h2>
            <div className="overflow-x-auto border border-surface-200 rounded-lg">
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-surface-50">
                    <th className="text-left px-3 py-2 font-semibold">Query</th>
                    {competitorNames.map((name) =>
                      llms.map((llm) => (
                        <th
                          key={`${name}-${llm}`}
                          className="text-center px-2 py-2 font-semibold"
                        >
                          <span className="block">{name}</span>
                          <span className="text-surface-400 font-normal">
                            {llmLabels[llm]}
                          </span>
                        </th>
                      ))
                    )}
                  </tr>
                </thead>
                <tbody>
                  {competitorMatrix.map((row, i) => (
                    <tr key={i} className="border-t border-surface-100">
                      <td className="px-3 py-2 max-w-xs truncate">{row.query}</td>
                      {competitorNames.map((name) =>
                        llms.map((llm) => {
                          const d = row.data[name]?.[llm];
                          return (
                            <td key={`${name}-${llm}`} className="text-center px-2 py-2">
                              {d?.mentioned ? (
                                <span className="text-green-600">&#x2713;</span>
                              ) : (
                                <span className="text-surface-300">—</span>
                              )}
                            </td>
                          );
                        })
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* Hallucination Log */}
        {allHallucinations.length > 0 && (
          <section className="mb-12" style={isPdf ? { pageBreakInside: "avoid" } : undefined}>
            <h2 className="text-xs font-semibold text-surface-500 uppercase tracking-widest mb-4">
              Hallucination & Accuracy Log
            </h2>
            <div className="space-y-3">
              {allHallucinations.map((h, i) => (
                <div
                  key={i}
                  className={`border rounded-lg p-4 ${
                    h.severity === "critical"
                      ? "border-red-300 bg-red-50"
                      : h.severity === "major"
                        ? "border-amber-300 bg-amber-50"
                        : "border-surface-200 bg-surface-50"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className={`text-xs font-semibold uppercase ${
                        h.severity === "critical"
                          ? "text-red-700"
                          : h.severity === "major"
                            ? "text-amber-700"
                            : "text-surface-600"
                      }`}
                    >
                      {h.severity}
                    </span>
                    <span className="text-xs text-surface-400">
                      {llmLabels[h.llm]} · {h.query}
                    </span>
                  </div>
                  <p className="font-medium text-sm mb-1">{h.claim}</p>
                  <p className="text-xs text-surface-600">{h.evidence}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Root-Cause Analysis */}
        {report?.rootCauseAnalysis && (
          <section className="mb-12" style={isPdf ? { pageBreakInside: "avoid" } : undefined}>
            <h2 className="text-xs font-semibold text-surface-500 uppercase tracking-widest mb-4">
              Root-Cause Analysis
            </h2>
            <div className="bg-surface-50 rounded-lg p-6 leading-relaxed text-surface-700">
              {report.rootCauseAnalysis.split("\n").map((line, i) =>
                line.trim() ? <p key={i} className="mb-3 last:mb-0">{line}</p> : null
              )}
            </div>
          </section>
        )}

        {/* Action Roadmap */}
        {roadmap.length > 0 && (
          <section className="mb-12">
            <h2 className="text-xs font-semibold text-surface-500 uppercase tracking-widest mb-4">
              Prioritized Action Roadmap
            </h2>

            {/* Quick wins */}
            {roadmap.filter((r) => r.category === "quick_win").length > 0 && (
              <div className="mb-6">
                <h3 className="text-xs font-semibold text-green-700 mb-3">
                  Quick Wins — high impact, low effort
                </h3>
                <div className="space-y-2">
                  {roadmap
                    .filter((r) => r.category === "quick_win")
                    .map((item) => (
                      <div key={item.priority} className="flex gap-4 border border-surface-200 rounded-lg p-4">
                        <span className="text-lg font-semibold text-surface-300 font-mono w-6 flex-shrink-0">
                          {item.priority}
                        </span>
                        <div className="flex-1">
                          <p className="font-medium">{item.action}</p>
                          <p className="text-xs text-surface-500 mt-1">
                            {item.rationale}
                          </p>
                        </div>
                        <div className="flex items-start gap-2 flex-shrink-0">
                          <ImpactBadge level={item.impact} />
                          <ImpactBadge level={item.effort} />
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* Structural */}
            {roadmap.filter((r) => r.category === "structural").length > 0 && (
              <div className="mb-6">
                <h3 className="text-xs font-semibold text-amber-700 mb-3">
                  Structural — high impact, requires investment
                </h3>
                <div className="space-y-2">
                  {roadmap
                    .filter((r) => r.category === "structural")
                    .map((item) => (
                      <div key={item.priority} className="flex gap-4 border border-surface-200 rounded-lg p-4">
                        <span className="text-lg font-semibold text-surface-300 font-mono w-6 flex-shrink-0">
                          {item.priority}
                        </span>
                        <div className="flex-1">
                          <p className="font-medium">{item.action}</p>
                          <p className="text-xs text-surface-500 mt-1">
                            {item.rationale}
                          </p>
                        </div>
                        <div className="flex items-start gap-2 flex-shrink-0">
                          <ImpactBadge level={item.impact} />
                          <ImpactBadge level={item.effort} />
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* Strategic */}
            {roadmap.filter((r) => r.category === "strategic").length > 0 && (
              <div>
                <h3 className="text-xs font-semibold text-blue-700 mb-3">
                  Strategic — long-term positioning
                </h3>
                <div className="space-y-2">
                  {roadmap
                    .filter((r) => r.category === "strategic")
                    .map((item) => (
                      <div key={item.priority} className="flex gap-4 border border-surface-200 rounded-lg p-4">
                        <span className="text-lg font-semibold text-surface-300 font-mono w-6 flex-shrink-0">
                          {item.priority}
                        </span>
                        <div className="flex-1">
                          <p className="font-medium">{item.action}</p>
                          <p className="text-xs text-surface-500 mt-1">
                            {item.rationale}
                          </p>
                        </div>
                        <div className="flex items-start gap-2 flex-shrink-0">
                          <ImpactBadge level={item.impact} />
                          <ImpactBadge level={item.effort} />
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </section>
        )}

        {/* Footer */}
        <footer className="border-t-2 border-surface-900 pt-6 mt-12">
          <div className="flex justify-between text-xs text-surface-400">
            <span>ContextAI Q · AI Visibility Audit · {audit.companyName}</span>
            <span>Confidential</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
