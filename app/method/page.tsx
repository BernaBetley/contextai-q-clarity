import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";

import { TrackedLink } from "../components/TrackedLink";
import { buildMetadata } from "../lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Methodology",
  description: "Five-phase methodology for the ContextAI Q AI Visibility Audit, from question selection to delivery.",
  path: "/method",
});

export default function MethodPage() {
  const steps = [
    {
      number: "1",
      title: "Scope & Question Selection",
      description:
        "Define the 20 most strategic questions across brand, category, competitive, and use-case intent.",
      inputs: ["Business context", "Question mapping", "Competitive landscape review"],
      outputs: ["Validated question set", "Question categories", "Priority ranking"],
    },
    {
      number: "2",
      title: "Multi-LLM Testing",
      description:
        "Test every question across ChatGPT, Claude, Gemini, and Perplexity with consistent prompts and timestamps.",
      inputs: ["Question set", "LLM access", "Controlled testing process"],
      outputs: ["Response archive", "Screenshots", "Response metadata"],
    },
    {
      number: "3",
      title: "Visibility + Accuracy Scoring",
      description:
        "Score appearance, prominence, and accuracy on a 0–100 scale and identify hallucinations.",
      inputs: ["Response archive", "Brand fact sheet", "Scoring rubric"],
      outputs: ["Per-question scores", "Per-LLM scores", "Accuracy flags"],
    },
    {
      number: "4",
      title: "Root-Cause Analysis",
      description:
        "Identify why gaps exist: content structure, source availability, citation patterns, and authority signals.",
      inputs: ["Visibility gaps", "Content review", "Technical review"],
      outputs: ["Cause categorization", "Fixability assessment", "Technical findings"],
    },
    {
      number: "5",
      title: "Roadmap + Delivery",
      description:
        "Prioritize actions by impact and effort and deliver the report plus walkthrough.",
      inputs: ["Gap analysis", "Root causes", "Client context"],
      outputs: ["PDF report", "Action roadmap", "Walkthrough"],
    },
  ];

  return (
    <>
      <section className="section-slide pt-24 md:pt-32">
        <div className="container-wide">
          <p className="eyebrow mb-4">Methodology</p>
          <h1 className="mb-6 max-w-3xl">How the audit works</h1>
          <p className="lead max-w-2xl">Structured, five-step methodology. Transparent, repeatable, no black boxes.</p>
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
          <TrackedLink
            href="/audit"
            className="btn btn-primary btn-lg"
            eventName="cta_click"
            eventParams={{ location: "method_final", cta: "Start your audit" }}
          >
            Start your audit <ArrowRight size={18} />
          </TrackedLink>
        </div>
      </section>
    </>
  );
}

