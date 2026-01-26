import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";
import { SEO, WebPageSchema } from "@/components/layout/SEO";

export default function Services() {
  const packages = [
    {
      name: "AI Visibility Audit",
      price: "€500",
      priceNote: "Fixed scope",
      description: "Baseline measurement of your AI visibility position.",
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
      name: "Implementation",
      price: "Custom",
      priceNote: "Discovery-based",
      description: "Execute the audit recommendations with expert guidance.",
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
      price: "Monthly",
      priceNote: "Ongoing",
      description: "Continuous tracking and optimization of AI visibility.",
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
      explanation: "Implementation pricing is based on a paid discovery phase to scope accurately.",
    },
    {
      principle: "Value-aligned retainers",
      explanation: "Monthly retainers scale with the complexity of your AI visibility needs.",
    },
    {
      principle: "No made-up benchmarks",
      explanation: "We don't cite fake industry statistics. Our recommendations are based on your actual data.",
    },
  ];

  return (
    <>
      <SEO
        title="Services & Pricing"
        description="AI Visibility services: €500 fixed-scope audit, custom implementation, and ongoing monitoring retainers. Clear pricing, measurable outcomes."
        canonical="/services"
      />
      <WebPageSchema
        title="Services & Pricing"
        description="AI Visibility services from ContextAI Q. Audit, implementation, and monitoring."
        url="/services"
      />

      {/* Hero */}
      <section className="section-slide pt-24 md:pt-32">
        <div className="container-wide">
          <p className="eyebrow mb-4">Services</p>
          <h1 className="mb-6 max-w-3xl">Clear services, measurable outcomes</h1>
          <p className="lead max-w-2xl">
            From initial audit to ongoing optimization. Choose the engagement model that fits your needs.
          </p>
        </div>
      </section>

      {/* TL;DR */}
      <section className="section-slide bg-secondary/30">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto text-center">
            <p className="eyebrow mb-4">TL;DR</p>
            <p className="text-large">
              Start with the €500 audit to establish baseline. 
              Implementation and monitoring are scoped based on your specific needs and findings.
            </p>
          </div>
        </div>
      </section>

      {/* Packages */}
      <section className="section-slide">
        <div className="container-wide">
          <div className="grid-3-col">
            {packages.map((pkg, index) => (
              <div 
                key={index} 
                className={`card-minimal flex flex-col ${pkg.featured ? 'ring-2 ring-foreground' : ''}`}
              >
                {pkg.featured && (
                  <span className="badge-tag self-start mb-4">Recommended start</span>
                )}
                <h3 className="mb-2">{pkg.name}</h3>
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-3xl font-serif font-semibold">{pkg.price}</span>
                  <span className="text-small">{pkg.priceNote}</span>
                </div>
                <p className="text-muted-foreground mb-6">{pkg.description}</p>
                <ul className="space-y-3 mb-8 flex-1">
                  {pkg.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check size={16} className="flex-shrink-0 mt-1" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link to={pkg.href}>
                  <Button 
                    variant={pkg.featured ? "default" : "outline"} 
                    className="w-full"
                  >
                    {pkg.cta}
                    <ArrowRight size={16} />
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How We Price */}
      <section className="section-slide bg-secondary/30">
        <div className="container-wide">
          <p className="eyebrow mb-4">Pricing Philosophy</p>
          <h2 className="mb-12">How we price</h2>
          
          <div className="grid-2-col max-w-4xl">
            {pricingPrinciples.map((item, index) => (
              <div key={index} className="card-minimal bg-background">
                <h3 className="text-lg mb-2">{item.principle}</h3>
                <p className="text-muted-foreground">{item.explanation}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-slide">
        <div className="container-wide text-center">
          <h2 className="mb-6">Not sure where to start?</h2>
          <p className="lead max-w-xl mx-auto mb-10">
            The €500 audit provides the data you need to make informed decisions about next steps.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/audit">
              <Button variant="hero">
                Start with the audit
                <ArrowRight size={18} />
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="heroOutline">
                Talk to us first
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
