import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Proof & Measurement",
  description:
    "How we measure AI visibility: Share-of-Voice, citation rate, accuracy scoring, hallucination tracking. Defined KPIs with clear benchmarks.",
  alternates: { canonical: "/measurement" },
};

export default function MeasurementPage() {
  const kpis = [
    {
      name: "AI Share-of-Voice",
      definition: "The percentage of category-relevant queries where your brand appears in AI-generated responses.",
      measurement: "Query sampling across target LLMs, appearance tracking, position scoring.",
      benchmark: "Baseline established in your audit; tracked over time against your category.",
    },
    {
      name: "Citation Rate",
      definition: "How frequently LLMs attribute information to your official sources.",
      measurement: "Source analysis in responses, link tracking, attribution patterns.",
      benchmark: "Baseline established in your audit; target increases as citation-ready sources improve.",
    },
    {
      name: "Accuracy Score",
      definition: "Correctness of information presented about your brand in AI responses.",
      measurement: "Fact verification against authoritative sources, error categorization.",
      benchmark: "Target: 95%+ accuracy",
    },
    {
      name: "Hallucination Flags",
      definition: "Instances where LLMs present false or fabricated information about your brand.",
      measurement: "Systematic verification, severity classification, tracking over time.",
      benchmark: "Target: Zero critical hallucinations",
    },
    {
      name: "Competitive Displacement",
      definition: "Queries where competitors appear but you don't, or vice versa.",
      measurement: "Head-to-head comparison, position tracking, trend analysis.",
      benchmark: "Baseline established in your audit; tracked by query and by competitor.",
    },
  ];

  return (
    <>
      <section className="section-slide pt-24 md:pt-32">
        <div className="container-wide">
          <p className="eyebrow mb-4">Measurement</p>
          <h1 className="mb-6 max-w-3xl">What gets measured gets managed</h1>
          <p className="lead max-w-2xl">
            We define and track the KPIs that matter for AI visibility. No vanity metrics. No made-up benchmarks.
          </p>
        </div>
      </section>

      <section className="section-slide">
        <div className="container-wide">
          <p className="eyebrow mb-4">Core KPIs</p>
          <h2 className="mb-12">What we measure</h2>

          <div className="space-y-6">
            {kpis.map((kpi) => (
              <div key={kpi.name} className="card-minimal grid md:grid-cols-4 gap-6">
                <div>
                  <h3 className="text-lg">{kpi.name}</h3>
                </div>
                <div>
                  <p className="eyebrow mb-2 text-muted-foreground">Definition</p>
                  <p className="text-sm">{kpi.definition}</p>
                </div>
                <div>
                  <p className="eyebrow mb-2 text-muted-foreground">How measured</p>
                  <p className="text-sm">{kpi.measurement}</p>
                </div>
                <div>
                  <p className="eyebrow mb-2 text-muted-foreground">Benchmark</p>
                  <p className="text-sm">{kpi.benchmark}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-slide">
        <div className="container-wide text-center">
          <h2 className="mb-6">Start with measurement</h2>
          <p className="lead max-w-xl mx-auto mb-10">The €500 audit establishes your baseline across all KPIs.</p>
          <Link
            href="/audit"
            className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-8 py-6 text-base font-medium text-primary-foreground shadow-elevated transition-all duration-200 hover:shadow-prominent hover:-translate-y-0.5 active:translate-y-0"
          >
            Get your baseline <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </>
  );
}

