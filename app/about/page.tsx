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
          <h1 className="mb-6 max-w-3xl">AI visibility advisory for teams who need evidence, not hype</h1>
          <p className="lead max-w-2xl">
            ContextAI Q helps organizations understand and improve how they appear in AI-generated answers. We measure what
            matters, benchmark against competitors, and deliver a roadmap grounded in evidence — not speculation.
          </p>
        </div>
      </section>

      <section className="section-slide bg-secondary/30">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto text-center">
            <p className="eyebrow mb-4">Mission</p>
            <p className="text-2xl md:text-3xl font-serif leading-relaxed">
              &ldquo;When AI systems answer questions about your industry, your brand should appear — accurately, credibly,
              and on your terms.&rdquo;
            </p>
          </div>
        </div>
      </section>

      <section className="section-slide">
        <div className="container-wide">
          <div className="grid-2-col items-start">
            <div>
              <p className="eyebrow mb-4">Why now</p>
              <h2 className="mb-8">The buyer journey now starts inside an AI response</h2>
              <div className="space-y-6 text-lg">
                <p>
                  A growing share of B2B research begins with a question to an AI assistant. The shortlist forms inside the model
                  response — before a prospect visits any website. If your brand is absent or misrepresented at that moment, you
                  are excluded from consideration without knowing it.
                </p>
                <p>
                  Traditional SEO drives search rankings. GEO (Generative Engine Optimization) optimizes for AI citation. But
                  neither discipline has a standard way to measure outcomes across models. That is the gap we close.
                </p>
                <p>
                  ContextAI Q provides the measurement layer: a repeatable methodology that quantifies your AI visibility,
                  identifies root causes, and delivers a roadmap you can execute or hand to your team.
                </p>
              </div>
            </div>
            <div className="card-minimal">
              <p className="eyebrow mb-4">What we do</p>
              <ul className="space-y-3 text-small">
                <li>Measure visibility and accuracy across ChatGPT, Claude, Gemini, and Perplexity.</li>
                <li>Benchmark your position against three named competitors.</li>
                <li>Identify root causes: missing sources, structural gaps, citation patterns.</li>
                <li>Deliver a prioritized roadmap sequenced by impact and effort.</li>
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
          <h2 className="mb-6">See where your brand stands today</h2>
          <p className="lead max-w-xl mx-auto mb-10">The €500 audit gives you a scored baseline, competitive comparison, and a clear next step.</p>
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

