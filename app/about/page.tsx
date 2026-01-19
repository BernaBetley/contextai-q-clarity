import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";

import { TrackedLink } from "../components/TrackedLink";
import { buildMetadata } from "../lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "About",
  description:
    "ContextAI Q is an AI visibility advisory helping brands be accurately represented in AI-generated answers.",
  path: "/about",
});

export default function AboutPage() {
  const values = [
    {
      title: "Clarity over complexity",
      description: "We explain what we do in plain terms. No jargon, no mystification.",
    },
    {
      title: "Measurement over claims",
      description: "We define KPIs upfront and report against them honestly.",
    },
    {
      title: "Fixed scope, no surprises",
      description: "Our audit has a defined scope and price. Implementation is scoped before commitment.",
    },
    {
      title: "No fabricated data",
      description: "We don’t cite made-up statistics. We ground decisions in measured baselines and verifiable sources.",
    },
  ];

  return (
    <>
      <section className="section-slide pt-24 md:pt-32">
        <div className="container-wide">
          <p className="eyebrow mb-4">About</p>
          <h1 className="mb-6 max-w-3xl">AI visibility advisory for teams who need accuracy, not hype</h1>
          <p className="lead max-w-2xl">
            ContextAI Q helps organizations measure and improve how they appear in AI-generated answers — with evidence,
            benchmarks, and a clear implementation path.
          </p>
        </div>
      </section>

      <section className="section-slide bg-secondary/30">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto text-center">
            <p className="eyebrow mb-4">Mission</p>
            <p className="text-2xl md:text-3xl font-serif leading-relaxed">
              “Ensure that when AI systems answer questions about your industry, your brand appears accurately and
              credibly.”
            </p>
          </div>
        </div>
      </section>

      <section className="section-slide">
        <div className="container-wide">
          <div className="grid-2-col items-start">
            <div>
              <p className="eyebrow mb-4">Why now</p>
              <h2 className="mb-8">Discovery is moving inside AI answers</h2>
              <div className="space-y-6 text-lg">
                <p>
                  Buyers increasingly ask AI assistants for recommendations. The shortlist is forming inside the model response,
                  not on a search results page.
                </p>
                <p>
                  Traditional SEO signals are still important, but they are insufficient for AI visibility. You need structured,
                  citation-ready sources that LLMs can trust.
                </p>
                <p>
                  ContextAI Q exists to close this gap with a repeatable measurement methodology and an implementation path that
                  makes the output actionable.
                </p>
              </div>
            </div>
            <div className="card-minimal">
              <p className="eyebrow mb-4">What we do</p>
              <ul className="space-y-3 text-small">
                <li>Measure visibility and accuracy across major LLMs.</li>
                <li>Benchmark against named competitors.</li>
                <li>Deliver a roadmap for citations, structure, and authority signals.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section-slide bg-secondary/30">
        <div className="container-wide">
          <p className="eyebrow mb-4">Values</p>
          <h2 className="mb-12">How we operate</h2>
          <div className="grid-2-col max-w-4xl">
            {values.map((value) => (
              <div key={value.title} className="card-minimal bg-background">
                <h3 className="text-lg mb-2">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-slide">
        <div className="container-wide text-center">
          <h2 className="mb-6">Ready to work together?</h2>
          <p className="lead max-w-xl mx-auto mb-10">Start with the audit to see where you stand.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <TrackedLink
              href="/audit"
              className="btn btn-primary btn-lg"
              eventName="cta_click"
              eventParams={{ location: "about_final", cta: "Start your audit" }}
            >
              Start your audit <ArrowRight size={18} />
            </TrackedLink>
            <TrackedLink
              href="/contact"
              className="btn btn-secondary btn-lg"
              eventName="cta_click"
              eventParams={{ location: "about_final", cta: "Get in touch" }}
            >
              Get in touch
            </TrackedLink>
          </div>
        </div>
      </section>
    </>
  );
}

