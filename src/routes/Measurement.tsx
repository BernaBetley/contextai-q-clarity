import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { SEO, WebPageSchema } from "@/components/layout/SEO";

export default function Measurement() {
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

  const cadence = [
    { frequency: "Weekly", deliverable: "Position tracking dashboard update" },
    { frequency: "Monthly", deliverable: "Full report with trends and recommendations" },
    { frequency: "Quarterly", deliverable: "Strategic review and roadmap adjustment" },
    { frequency: "Ad-hoc", deliverable: "Hallucination alerts (immediate)" },
  ];

  return (
    <>
      <SEO
        title="Proof & Measurement"
        description="How we measure AI visibility: Share-of-Voice, citation rate, accuracy scoring, hallucination tracking. Defined KPIs with clear benchmarks."
        canonical="/measurement"
      />
      <WebPageSchema
        title="Proof & Measurement"
        description="Our measurement framework for AI visibility KPIs."
        url="/measurement"
      />

      {/* Hero */}
      <section className="section-slide pt-24 md:pt-32">
        <div className="container-wide">
          <p className="eyebrow mb-4">Measurement</p>
          <h1 className="mb-6 max-w-3xl">What gets measured gets managed</h1>
          <p className="lead max-w-2xl">
            We define and track the KPIs that matter for AI visibility. 
            No vanity metrics. No made-up benchmarks.
          </p>
        </div>
      </section>

      {/* KPI Definitions */}
      <section className="section-slide">
        <div className="container-wide">
          <p className="eyebrow mb-4">Core KPIs</p>
          <h2 className="mb-12">What we measure</h2>
          
          <div className="space-y-6">
            {kpis.map((kpi, index) => (
              <div key={index} className="card-minimal grid md:grid-cols-4 gap-6">
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

      {/* Sample Dashboard */}
      <section className="section-slide bg-secondary/30">
        <div className="container-wide">
          <p className="eyebrow mb-4">Example</p>
          <h2 className="mb-4">Sample dashboard view</h2>
          <p className="text-muted-foreground mb-12">
            For illustration only. Actual dashboards are customized per client.
          </p>
          
          <div className="card-minimal bg-background">
            <div className="grid-4-col text-center py-8">
              <div>
                <p className="text-5xl font-serif font-semibold mb-2">47%</p>
                <p className="text-small">AI Share-of-Voice</p>
                <p className="text-xs text-muted-foreground mt-1">+12% vs baseline</p>
              </div>
              <div>
                <p className="text-5xl font-serif font-semibold mb-2">23%</p>
                <p className="text-small">Citation Rate</p>
                <p className="text-xs text-muted-foreground mt-1">+8% vs baseline</p>
              </div>
              <div>
                <p className="text-5xl font-serif font-semibold mb-2">91%</p>
                <p className="text-small">Accuracy Score</p>
                <p className="text-xs text-muted-foreground mt-1">+15% vs baseline</p>
              </div>
              <div>
                <p className="text-5xl font-serif font-semibold mb-2">2</p>
                <p className="text-small">Hallucination Flags</p>
                <p className="text-xs text-muted-foreground mt-1">-5 vs baseline</p>
              </div>
            </div>
            <p className="text-center text-xs text-muted-foreground border-t border-border pt-4">
              [Example data for illustration purposes only]
            </p>
          </div>
        </div>
      </section>

      {/* Before/After Template */}
      <section className="section-slide">
        <div className="container-wide">
          <p className="eyebrow mb-4">Results Template</p>
          <h2 className="mb-12">Before / After framework</h2>
          
          <div className="grid-2-col max-w-4xl">
            <div className="card-minimal">
              <h3 className="mb-4">Before (Baseline)</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li>• AI Share-of-Voice: [X%]</li>
                <li>• Citation Rate: [X%]</li>
                <li>• Accuracy Score: [X%]</li>
                <li>• Hallucination Count: [X]</li>
                <li>• Competitive Position: [X of Y]</li>
              </ul>
              <p className="text-xs text-muted-foreground mt-4">[Anonymized client template]</p>
            </div>
            <div className="card-minimal">
              <h3 className="mb-4">After (Post-implementation)</h3>
              <ul className="space-y-3">
                <li>• AI Share-of-Voice: [X%] <span className="text-muted-foreground">(+Y%)</span></li>
                <li>• Citation Rate: [X%] <span className="text-muted-foreground">(+Y%)</span></li>
                <li>• Accuracy Score: [X%] <span className="text-muted-foreground">(+Y%)</span></li>
                <li>• Hallucination Count: [X] <span className="text-muted-foreground">(-Y)</span></li>
                <li>• Competitive Position: [X of Y] <span className="text-muted-foreground">(+Z)</span></li>
              </ul>
              <p className="text-xs text-muted-foreground mt-4">[Anonymized client template]</p>
            </div>
          </div>
        </div>
      </section>

      {/* Reporting Cadence */}
      <section className="section-slide bg-secondary/30">
        <div className="container-wide">
          <p className="eyebrow mb-4">Reporting</p>
          <h2 className="mb-12">Reporting cadence</h2>
          
          <div className="grid-4-col max-w-4xl">
            {cadence.map((item, index) => (
              <div key={index} className="card-minimal bg-background text-center">
                <p className="font-serif text-xl font-semibold mb-2">{item.frequency}</p>
                <p className="text-small">{item.deliverable}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-slide">
        <div className="container-wide text-center">
          <h2 className="mb-6">Start with measurement</h2>
          <p className="lead max-w-xl mx-auto mb-10">
            The €500 audit establishes your baseline across all five KPIs.
          </p>
          <Link to="/audit">
            <Button variant="hero">
              Get your baseline
              <ArrowRight size={18} />
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
}
