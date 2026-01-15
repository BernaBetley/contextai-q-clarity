import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock, FileText } from "lucide-react";

export const metadata: Metadata = {
  title: "How It Works",
  description: "Our methodology for measuring and improving AI visibility. From audit to implementation to ongoing monitoring.",
  alternates: { canonical: "/how-it-works" },
};

export default function HowItWorksPage() {
  const layers = [
    {
      number: "01",
      title: "Discovery & Scoping",
      input: "Business context, target queries, competitor list",
      method: "Stakeholder intake, query mapping, baseline measurement",
      output: "Audit scope document, 20 validated queries",
    },
    {
      number: "02",
      title: "Multi-LLM Testing",
      input: "Query set, competitor names, current content",
      method: "Systematic prompting across ChatGPT, Claude, Gemini, Perplexity",
      output: "Raw response data, visibility scores, accuracy flags",
    },
    {
      number: "03",
      title: "Analysis & Scoring",
      input: "Response data, accuracy criteria",
      method: "Citation analysis, fact verification, competitive positioning",
      output: "Scored matrix, hallucination inventory, gap analysis",
    },
    {
      number: "04",
      title: "Recommendations",
      input: "Analysis results, client capabilities",
      method: "Prioritization framework, effort/impact mapping",
      output: "Ranked action roadmap, quick wins, strategic initiatives",
    },
    {
      number: "05",
      title: "Delivery & Review",
      input: "Complete audit package",
      method: "Executive summary, detailed findings, walkthrough session",
      output: "PDF report, optional 30-min walkthrough",
    },
  ];

  const deliverables = [
    { icon: FileText, title: "Executive Summary", description: "Leadership-ready overview" },
    { icon: FileText, title: "Full Audit Report", description: "Detailed findings with screenshots" },
    { icon: FileText, title: "Competitive Matrix", description: "Your position vs. 3 competitors" },
    { icon: FileText, title: "Action Roadmap", description: "Prioritized recommendations" },
  ];

  return (
    <>
      <section className="section-slide pt-24 md:pt-32">
        <div className="container-wide">
          <p className="eyebrow mb-4">Methodology</p>
          <h1 className="mb-6 max-w-3xl">How we measure AI visibility</h1>
          <p className="lead max-w-2xl">A structured process that delivers actionable insights in 5–7 business days.</p>
        </div>
      </section>

      <section className="section-slide bg-secondary/30">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto text-center">
            <p className="eyebrow mb-4">TL;DR</p>
            <p className="text-large">
              We test 20 strategic queries across 4 major LLMs, benchmark against 3 competitors, score for visibility and
              accuracy, and deliver a prioritized action roadmap.
            </p>
          </div>
        </div>
      </section>

      <section className="section-slide">
        <div className="container-wide">
          <p className="eyebrow mb-4">Five-layer method</p>
          <h2 className="mb-12">Input → Method → Output</h2>

          <div className="space-y-8">
            {layers.map((layer) => (
              <div key={layer.number} className="card-minimal grid md:grid-cols-4 gap-6 items-start">
                <div>
                  <span className="text-4xl font-serif font-semibold text-muted-foreground">{layer.number}</span>
                  <h3 className="mt-2">{layer.title}</h3>
                </div>
                <div>
                  <p className="eyebrow mb-2 text-muted-foreground">Input</p>
                  <p className="text-small">{layer.input}</p>
                </div>
                <div>
                  <p className="eyebrow mb-2 text-muted-foreground">Method</p>
                  <p className="text-small">{layer.method}</p>
                </div>
                <div>
                  <p className="eyebrow mb-2 text-muted-foreground">Output</p>
                  <p className="text-small">{layer.output}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-slide bg-secondary/30">
        <div className="container-wide">
          <p className="eyebrow mb-4">Deliverables</p>
          <h2 className="mb-12">What you receive</h2>

          <div className="grid-2-col">
            {deliverables.map((item) => (
              <div key={item.title} className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-background flex items-center justify-center flex-shrink-0">
                  <item.icon size={20} />
                </div>
                <div>
                  <h3 className="text-lg mb-1">{item.title}</h3>
                  <p className="text-small">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-slide">
        <div className="container-wide text-center">
          <div className="inline-flex items-center gap-2 text-muted-foreground mb-6">
            <Clock size={16} />
            <span>Delivered in 5–7 business days</span>
          </div>
          <h2 className="mb-6">Ready to start?</h2>
          <p className="lead max-w-xl mx-auto mb-10">The €500 audit is the fastest way to establish your baseline.</p>
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

