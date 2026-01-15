import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "About",
  description:
    "ContextAI Q helps brands become visible and accurately represented in AI-generated answers. Services provided globally.",
  alternates: { canonical: "/about" },
};

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
          <h1 className="mb-6 max-w-3xl">Making brands visible in AI</h1>
          <p className="lead max-w-2xl">We help organizations understand and improve how they appear in AI-generated answers.</p>
        </div>
      </section>

      <section className="section-slide bg-secondary/30">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto text-center">
            <p className="eyebrow mb-4">Mission</p>
            <p className="text-2xl md:text-3xl font-serif leading-relaxed">
              “Ensure that when AI systems answer questions about your industry, your brand appears prominently and accurately.”
            </p>
          </div>
        </div>
      </section>

      <section className="section-slide">
        <div className="container-wide">
          <div className="max-w-3xl">
            <p className="eyebrow mb-4">Why now</p>
            <h2 className="mb-8">The discovery landscape is shifting</h2>
            <div className="space-y-6 text-lg">
              <p>
                AI assistants are changing how people find information. Users increasingly ask AI directly rather than searching
                and clicking through results.
              </p>
              <p>
                This creates a new challenge: brands optimized for traditional search may be invisible or misrepresented in
                AI-generated responses. The structures and authority signals that work for search don’t automatically translate
                to LLM visibility.
              </p>
              <p>
                ContextAI Q exists to close this gap with a repeatable measurement methodology and an implementation path that
                makes the output actionable.
              </p>
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
            <Link
              href="/audit"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-8 py-6 text-base font-medium text-primary-foreground shadow-elevated transition-all duration-200 hover:shadow-prominent hover:-translate-y-0.5 active:translate-y-0"
            >
              Start your audit <ArrowRight size={18} />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-md border-2 border-foreground bg-transparent px-8 py-6 text-base font-medium text-foreground transition-all duration-200 hover:bg-foreground hover:text-background"
            >
              Get in touch
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

