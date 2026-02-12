import Link from "next/link";
import { db } from "@/lib/db";
import { audits } from "@/lib/db/schema";
import { desc } from "drizzle-orm";
import { formatDistanceToNow } from "date-fns";

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

  const labels: Record<string, string> = {
    payment_received: "Payment received",
    intake_pending: "Awaiting intake",
    intake_complete: "Intake complete",
    generating_queries: "Generating queries",
    testing_llms: "Testing LLMs",
    scoring: "Scoring",
    analyzing: "Analyzing",
    generating_report: "Generating report",
    complete: "Complete",
    failed: "Failed",
  };

  return (
    <span className={`badge ${styles[status] ?? "badge-pending"}`}>
      {labels[status] ?? status}
    </span>
  );
}

export default async function DashboardPage() {
  const allAudits = await db
    .select()
    .from(audits)
    .orderBy(desc(audits.createdAt));

  const stats = {
    total: allAudits.length,
    active: allAudits.filter(
      (a) =>
        !["complete", "failed", "payment_received", "intake_pending"].includes(a.status)
    ).length,
    complete: allAudits.filter((a) => a.status === "complete").length,
    avgScore:
      allAudits.filter((a) => a.overallScore !== null).length > 0
        ? Math.round(
            allAudits
              .filter((a) => a.overallScore !== null)
              .reduce((sum, a) => sum + (a.overallScore ?? 0), 0) /
              allAudits.filter((a) => a.overallScore !== null).length
          )
        : null,
  };

  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold">Dashboard</h1>
          <p className="text-sm text-surface-500 mt-1">
            All AI Visibility Audits
          </p>
        </div>
        <Link href="/admin/new" className="btn btn-primary">
          New audit
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        {[
          { label: "Total audits", value: stats.total },
          { label: "In progress", value: stats.active },
          { label: "Complete", value: stats.complete },
          {
            label: "Avg. score",
            value: stats.avgScore !== null ? `${stats.avgScore}/100` : "—",
          },
        ].map((stat) => (
          <div key={stat.label} className="card">
            <p className="text-xs text-surface-500 uppercase tracking-wider">
              {stat.label}
            </p>
            <p className="text-2xl font-semibold mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      {allAudits.length === 0 ? (
        <div className="card text-center py-12">
          <p className="text-surface-500 mb-4">No audits yet</p>
          <Link href="/admin/new" className="btn btn-primary">
            Create your first audit
          </Link>
        </div>
      ) : (
        <div className="card p-0 overflow-hidden">
          <table className="table">
            <thead>
              <tr>
                <th>Company</th>
                <th>Client</th>
                <th>Status</th>
                <th>Score</th>
                <th>Created</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {allAudits.map((audit) => (
                <tr key={audit.id}>
                  <td className="font-medium">
                    {audit.companyName ?? "—"}
                  </td>
                  <td className="text-surface-500">
                    {audit.clientEmail ?? "—"}
                  </td>
                  <td>
                    <StatusBadge status={audit.status} />
                  </td>
                  <td className="font-mono">
                    {audit.overallScore !== null
                      ? `${audit.overallScore}`
                      : "—"}
                  </td>
                  <td className="text-surface-500 text-xs">
                    {formatDistanceToNow(new Date(audit.createdAt), {
                      addSuffix: true,
                    })}
                  </td>
                  <td>
                    <Link
                      href={`/admin/audit/${audit.id}`}
                      className="text-sm text-brand-600 hover:text-brand-700"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
