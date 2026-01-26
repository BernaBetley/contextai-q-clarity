import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";

import { TrackedLink } from "../components/TrackedLink";
import { buildMetadata } from "../lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Pricing & Packages",
  description:
    "Clear pricing for the AI Visibility Audit, implementation sprints, and monitoring retainers. Start with the €500 fixed-scope audit.",
  path: "/services",
});

export default function ServicesPage() {
  const packages = [
    {
      name: "AI Visibility Audit",
      price: "€500",
      priceNote: "Fixed scope",
      description: "Baseline measurement of AI visibility and accuracy.",
      features: [
        "20 strategic buyer questions tested",
        "3 LLMs evaluated",
        "3 competitors benchmarked",
        "Prioritized action roadmap",
        "PDF report + walkthrough",
      ],
      cta: "Start audit",
      href: "/audit",
      featured: true,
    },
    {
      name: "Implementation Sprint",
      price: "Starting at €2,500",
      priceNote: "Scope-based",
      description: "Turn audit findings into citation-ready assets and fixes.",
      features: [
        "Content architecture design",
        "Schema markup implementation",
        "Fact-sheet and citation optimization",
        "Knowledge graph strategy",
        "Technical SEO alignment",
      ],
      cta: "Discuss scope",
      href: "/contact",
      featured: false,
    },
    {
      name: "Monitoring Retainer",
      price: "Starting at €1,500 / month",
      priceNote: "Ongoing",
      description: "Continuous tracking of visibility and accuracy with monthly reporting.",
      features: [
        "Weekly position tracking",
        "Hallucination monitoring",
        "Competitive alerts",
        "Monthly reporting",
        "Optimization recommendations",
      ],
      cta: "Learn more",
      href: "/contact",
      featured: false,
    },
  ];

  const pricingPrinciples = [
    {
      principle: "Fixed scope, fixed price",
      explanation: "The €500 audit has a defined scope. No surprises, no overruns.",
    },
    {
      principle: "Discovery before commitment",
      explanation: "Implementation pricing is based on a scoping phase to define work accurately.",
    },
    {
      principle: "Value-aligned retainers",
      explanation: "Monthly retainers scale with the complexity of your AI visibility needs.",
    },
    {
      principle: "No made-up benchmarks",
      explanation: "We don’t cite fake industry statistics. Recommendations are grounded in your measured baseline.",
    },
  ];

  return (
    <>
      <section className="section-slide pt-24 md:pt-32">
        <div className="container-wide">
          <p className="eyebrow mb-4">Pricing</p>
          <h1 className="mb-6 max-w-3xl">Clear packages, measurable outcomes</h1>
          <p className="lead max-w-2xl">
            From initial audit to implementation and monitoring. Start with the audit, then scale as needed.
          </p>
        </div>
      </section>

      <section className="section-slide bg-secondary/30">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto text-center">
            <p className="eyebrow mb-4">TL;DR</p>
            <p className="text-large">
              Start with the €500 audit to establish your baseline. Implementation and monitoring are scoped to your findings.
            </p>
          </div>
        </div>
      </section>

      <section className="section-slide">
        <div className="container-wide">
          <div className="grid-3-col">
            {packages.map((pkg) => (
              <div
                key={pkg.name}
                className={`card-minimal flex flex-col ${pkg.featured ? "ring-2 ring-foreground" : ""}`}
              >
                {pkg.featured ? <span className="badge-tag self-start mb-4">Recommended start</span> : null}
                <h3 className="mb-2">{pkg.name}</h3>
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-3xl font-serif font-semibold">{pkg.price}</span>
                  <span className="text-small">{pkg.priceNote}</span>
                </div>
                <p className="text-muted-foreground mb-6">{pkg.description}</p>
                <ul className="space-y-3 mb-8 flex-1">
                  {pkg.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <span className="flex-shrink-0 mt-1 text-muted-foreground">—</span>
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <TrackedLink
                  href={pkg.href}
                  className={`btn btn-sm ${
                    pkg.featured ? "btn-primary" : "btn-secondary"
                  }`}
                  eventName="cta_click"
                  eventParams={{ location: "pricing_card", cta: pkg.cta }}
                >
                  {pkg.cta} <ArrowRight size={16} />
                </TrackedLink>
              </div>
            ))}
          </div>
          <p className="text-small text-muted-foreground mt-6">
            Implementation and monitoring pricing are starting points and are confirmed after scope definition.
          </p>
        </div>
      </section>

      <section className="section-slide bg-secondary/30">
        <div className="container-wide">
          <p className="eyebrow mb-4">Engagement path</p>
          <h2 className="mb-12">How clients typically progress</h2>
          <div className="grid-3-col">
            {[
              {
                title: "Audit",
                description: "Establish visibility baseline, evidence, and priority fixes.",
              },
              {
                title: "Implementation",
                description: "Build citation-ready content and fix structural gaps.",
              },
              {
                title: "Monitoring",
                description: "Track visibility changes and adjust as models evolve.",
              },
            ].map((item) => (
              <div key={item.title} className="card-minimal bg-background">
                <h3 className="mb-3">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-slide bg-secondary/30">
        <div className="container-wide">
          <p className="eyebrow mb-4">Pricing philosophy</p>
          <h2 className="mb-12">How we price</h2>

          <div className="grid-2-col max-w-4xl">
            {pricingPrinciples.map((item) => (
              <div key={item.principle} className="card-minimal bg-background">
                <h3 className="text-lg mb-2">{item.principle}</h3>
                <p className="text-muted-foreground">{item.explanation}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-slide">
        <div className="container-wide text-center">
          <h2 className="mb-6">Not sure where to start?</h2>
          <p className="lead max-w-xl mx-auto mb-10">The €500 audit gives you the baseline for every next decision.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <TrackedLink
              href="/audit"
              className="btn btn-primary btn-lg"
              eventName="cta_click"
              eventParams={{ location: "pricing_final", cta: "Start with the audit" }}
            >
              Start with the audit <ArrowRight size={18} />
            </TrackedLink>
            <TrackedLink
              href="/contact"
              className="btn btn-secondary btn-lg"
              eventName="cta_click"
              eventParams={{ location: "pricing_final", cta: "Talk to us first" }}
            >
              Talk to us first
            </TrackedLink>
          </div>
        </div>
      </section>
    </>
  );
}

