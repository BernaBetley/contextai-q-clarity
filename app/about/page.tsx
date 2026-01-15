import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Target, BarChart2, Shield, Lightbulb } from "lucide-react";

export const metadata: Metadata = {
  title: "About ContextAI Q — AI Visibility Specialists",
  description:
    "ContextAI Q helps B2B brands become visible and accurately represented in AI-generated answers. Based in Portugal, serving clients globally. Transparent methodology, measurable outcomes.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  const values = [
    {
      icon: Target,
      title: "Clarity over complexity",
      description: "We explain what we do in plain terms. No jargon, no mystification. If we can't explain it simply, we don't offer it.",
    },
    {
      icon: BarChart2,
      title: "Measurement over claims",
      description: "We define KPIs upfront and report against them honestly. Every recommendation links to a measurable outcome.",
    },
    {
      icon: Shield,
      title: "Fixed scope, no surprises",
      description: "Our audit has a defined scope and price. Implementation is scoped before commitment. You always know what you're paying for.",
    },
    {
      icon: Lightbulb,
      title: "No fabricated data",
      description: "We don't cite made-up statistics or 'industry benchmarks' we can't source. Decisions are grounded in your measured baseline.",
    },
  ];

  const differentiators = [
    {
      label: "What we do",
      content: "Measure and improve how your brand appears in AI-generated answers across ChatGPT, Claude, Gemini, and Perplexity.",
    },
    {
      label: "Who we serve",
      content: "B2B companies—typically SaaS, professional services, and tech—who want to understand their AI visibility position.",
    },
    {
      label: "How we're different",
      content: "Fixed-scope, transparent methodology, measurable outcomes. We don't sell mystery; we sell measurement and action.",
    },
    {
      label: "What we don't do",
      content: "We don't promise rankings. We don't use proprietary 'AI SEO' tools. We don't make claims we can't verify.",
    },
  ];

  return (
    <>
      <section className="section-slide pt-24 md:pt-32">
        <div className="container-wide">
          <p className="eyebrow mb-4">About</p>
          <h1 className="mb-6 max-w-3xl">Making brands visible in AI</h1>
          <p className="lead max-w-2xl">
            ContextAI Q helps organizations understand and improve how they appear in AI-generated answers. 
            We exist because AI is changing how buyers discover vendors—and most brands aren&apos;t ready.
          </p>
        </div>
      </section>

      <section className="section-slide bg-secondary/30">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto text-center">
            <p className="eyebrow mb-4">Mission</p>
            <blockquote className="text-2xl md:text-3xl font-serif leading-relaxed">
              &quot;Ensure that when AI systems answer questions about your industry, your brand appears prominently and accurately.&quot;
            </blockquote>
          </div>
        </div>
      </section>

      <section className="section-slide">
        <div className="container-wide">
          <div className="max-w-3xl">
            <p className="eyebrow mb-4">Context</p>
            <h2 className="mb-8">Why AI visibility matters now</h2>
            <div className="space-y-6 text-lg">
              <p>
                AI assistants are changing how people find information. Instead of searching and clicking through results, 
                users increasingly ask AI directly: &quot;What&apos;s the best tool for X?&quot; or &quot;Who provides Y service?&quot;
              </p>
              <p>
                This creates a new challenge: brands optimized for traditional search may be invisible or misrepresented 
                in AI-generated responses. The structures and authority signals that work for Google don&apos;t automatically 
                translate to LLM visibility.
              </p>
              <p>
                We measure this gap. We identify root causes. We provide specific actions to close it. 
                No mystery, no magic—just systematic measurement and practical recommendations.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-slide bg-secondary/30">
        <div className="container-wide">
          <p className="eyebrow mb-4">Positioning</p>
          <h2 className="mb-12">What we do (and don&apos;t)</h2>
          <div className="grid-2-col max-w-4xl">
            {differentiators.map((item) => (
              <div key={item.label} className="card-minimal bg-background">
                <p className="eyebrow mb-2">{item.label}</p>
                <p className="text-muted-foreground">{item.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-slide">
        <div className="container-wide">
          <p className="eyebrow mb-4">Values</p>
          <h2 className="mb-12">How we operate</h2>
          <div className="grid-2-col max-w-4xl">
            {values.map((value) => (
              <div key={value.title} className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                  <value.icon size={24} />
                </div>
                <div>
                  <h3 className="text-lg mb-2">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-slide bg-secondary/30">
        <div className="container-wide">
          <div className="max-w-3xl">
            <p className="eyebrow mb-4">Location</p>
            <h2 className="mb-6">Based in Portugal, serving globally</h2>
            <p className="text-lg text-muted-foreground mb-6">
              ContextAI Q operates remotely, serving clients worldwide. Our primary time zone is Western European (WET/WEST), 
              with availability for calls across North American and Middle Eastern time zones.
            </p>
            <p className="text-lg text-muted-foreground">
              All deliverables are in English. The audit process is asynchronous—no real-time calls required 
              (though we offer an optional walkthrough).
            </p>
          </div>
        </div>
      </section>

      <section className="section-slide">
        <div className="container-wide text-center">
          <h2 className="mb-6">Ready to work together?</h2>
          <p className="lead max-w-xl mx-auto mb-10">
            Start with the audit to establish your baseline. See exactly where you stand in AI-generated answers.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/audit"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-8 py-4 text-base font-medium text-primary-foreground shadow-elevated transition-all duration-200 hover:shadow-prominent hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              Start your audit <ArrowRight size={18} />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-md border-2 border-foreground bg-transparent px-8 py-4 text-base font-medium text-foreground transition-all duration-200 hover:bg-foreground hover:text-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              Get in touch
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
