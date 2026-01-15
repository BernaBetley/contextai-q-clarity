import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Methodology",
  description: "Step-by-step methodology for the ContextAI Q AI Visibility Audit. From query selection through report delivery.",
  alternates: { canonical: "/method" },
};

export default function MethodPage() {
  const steps = [
    {
      number: "1",
      title: "Query Selection",
      description:
        "Identify the 20 most strategic queries for your brand: brand queries, category queries, competitive queries, and use-case queries.",
      inputs: ["Business context interview", "Query mapping", "Competitive landscape review"],
      outputs: ["Validated query set", "Query categorization", "Priority ranking"],
    },
    {
      number: "2",
      title: "Multi-LLM Testing",
      description:
        "Execute each query across ChatGPT, Claude, Gemini, and Perplexity. Capture responses with timestamps.",
      inputs: ["Query set", "LLM access", "Controlled testing process"],
      outputs: ["Raw response archive", "Screenshots", "Response metadata"],
    },
    {
      number: "3",
      title: "Visibility Scoring",
      description:
        "Score each response for brand appearance (0-40), prominence position (0-30), and information accuracy (0-30). Total score: 0-100.",
      inputs: ["Response archive", "Brand fact sheet", "Scoring rubric"],
      outputs: ["Per-query scores", "Per-LLM scores", "Aggregate visibility index"],
    },
    {
      number: "4",
      title: "Accuracy Assessment",
      description:
        "Verify factual claims in responses against authoritative sources. Flag hallucinations, outdated information, and misattribution.",
      inputs: ["Response content", "Official brand information", "Verification sources"],
      outputs: ["Accuracy score", "Error inventory", "Hallucination log"],
    },
    {
      number: "5",
      title: "Competitive Benchmarking",
      description:
        "Apply the same methodology to 3 named competitors. Generate a head-to-head comparison matrix.",
      inputs: ["Competitor names", "Same query set", "Same LLMs"],
      outputs: ["Competitive matrix", "Gap analysis", "Position rankings"],
    },
    {
      number: "6",
      title: "Root Cause Analysis",
      description:
        "Identify why gaps exist: content structure, source availability, citation patterns, knowledge graph presence.",
      inputs: ["Visibility gaps", "Content review", "Technical review"],
      outputs: ["Cause categorization", "Fixability assessment", "Technical findings"],
    },
    {
      number: "7",
      title: "Recommendation Development",
      description:
        "Prioritize actions by impact and effort. Separate quick wins from strategic initiatives.",
      inputs: ["Gap analysis", "Root causes", "Client capabilities"],
      outputs: ["Ranked action list", "Quick wins", "Strategic roadmap"],
    },
    {
      number: "8",
      title: "Report Assembly",
      description:
        "Compile findings into executive summary and detailed report. Prepare walkthrough.",
      inputs: ["All analysis outputs", "Recommendations", "Client context"],
      outputs: ["PDF report", "Executive summary", "Walkthrough"],
    },
  ];

  return (
    <>
      <section className="section-slide pt-24 md:pt-32">
        <div className="container-wide">
          <p className="eyebrow mb-4">Methodology</p>
          <h1 className="mb-6 max-w-3xl">How the audit works</h1>
          <p className="lead max-w-2xl">A transparent, step-by-step methodology. No black boxes.</p>
        </div>
      </section>

      <section className="section-slide">
        <div className="container-wide">
          <div className="max-w-4xl space-y-12">
            {steps.map((step) => (
              <div key={step.number} className="card-minimal">
                <div className="flex items-start gap-6">
                  <span className="text-4xl font-serif font-semibold text-muted-foreground flex-shrink-0">{step.number}</span>
                  <div className="flex-1">
                    <h2 className="text-2xl mb-3">{step.title}</h2>
                    <p className="text-muted-foreground mb-6">{step.description}</p>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <p className="eyebrow mb-2">Inputs</p>
                        <ul className="space-y-1">
                          {step.inputs.map((input) => (
                            <li key={input} className="text-sm text-muted-foreground">
                              • {input}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <p className="eyebrow mb-2">Outputs</p>
                        <ul className="space-y-1">
                          {step.outputs.map((output) => (
                            <li key={output} className="text-sm">
                              • {output}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-slide bg-secondary/30">
        <div className="container-wide text-center">
          <h2 className="mb-6">Ready to apply this methodology?</h2>
          <p className="lead max-w-xl mx-auto mb-10">€500. Fixed scope. Delivered in 5–7 business days.</p>
          <Link
            href="/audit"
            className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-8 py-6 text-base font-medium text-primary-foreground shadow-elevated transition-all duration-200 hover:shadow-prominent hover:-translate-y-0.5 active:translate-y-0"
          >
            Start your audit <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </>
  );
}

