import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { SEO, WebPageSchema } from "@/components/layout/SEO";
import { track } from "@/lib/analytics";

export default function About() {
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
      description: "We don't cite made-up statistics. Our insights come from actual client work and verified sources.",
    },
  ];

  return (
    <>
      <SEO
        title="About"
        description="ContextAI Q helps brands become visible and accurately represented in AI-generated answers. Based in Portugal, serving globally."
        canonical="/about"
      />
      <WebPageSchema
        title="About ContextAI Q"
        description="Our mission, approach, and values."
        url="/about"
      />

      {/* Hero */}
      <section className="section-slide pt-24 md:pt-32">
        <div className="container-wide">
          <p className="eyebrow mb-4">About</p>
          <h1 className="mb-6 max-w-3xl">Making brands visible in AI</h1>
          <p className="lead max-w-2xl">
            We help organizations understand and improve how they appear 
            in AI-generated answers.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="section-slide bg-secondary/30">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto text-center">
            <p className="eyebrow mb-4">Mission</p>
            <p className="text-2xl md:text-3xl font-serif leading-relaxed">
              "To ensure that when AI systems answer questions about your industry, 
              your brand appears prominently and accurately."
            </p>
          </div>
        </div>
      </section>

      {/* Why Now */}
      <section className="section-slide">
        <div className="container-wide">
          <div className="max-w-3xl">
            <p className="eyebrow mb-4">Why Now</p>
            <h2 className="mb-8">The discovery landscape is shifting</h2>
            <div className="space-y-6 text-lg">
              <p>
                ChatGPT, Claude, Perplexity, and other AI assistants are changing how people 
                find information. Users increasingly ask AI directly rather than searching 
                and clicking through results.
              </p>
              <p>
                This creates a new challenge: brands optimized for traditional search 
                may be invisible or misrepresented in AI-generated responses. 
                The content structures, authority signals, and optimization tactics that 
                work for Google don't automatically translate to LLM visibility.
              </p>
              <p>
                We built ContextAI Q to address this gap. Our methodology measures AI visibility 
                specifically and provides actionable paths to improvement.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Delivery Model */}
      <section className="section-slide">
        <div className="container-wide">
          <div className="max-w-3xl">
            <p className="eyebrow mb-4">How We Work</p>
            <h2 className="mb-8">Delivery model</h2>
            <div className="grid-2-col">
              <div className="card-minimal">
                <h3 className="text-lg mb-3">Portugal Base</h3>
                <p className="text-muted-foreground">
                  Primary operations from Portugal. All audit work and remote 
                  consulting delivered from here.
                </p>
              </div>
              <div className="card-minimal">
                <h3 className="text-lg mb-3">Middle East Travel</h3>
                <p className="text-muted-foreground">
                  Regular travel to UAE and broader Middle East region for 
                  in-person client engagements and workshops.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-slide bg-secondary/30">
        <div className="container-wide">
          <p className="eyebrow mb-4">Values</p>
          <h2 className="mb-12">How we operate</h2>
          
          <div className="grid-2-col max-w-4xl">
            {values.map((value, index) => (
              <div key={index} className="card-minimal bg-background">
                <h3 className="text-lg mb-2">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-slide">
        <div className="container-wide text-center">
          <h2 className="mb-6">Ready to work together?</h2>
          <p className="lead max-w-xl mx-auto mb-10">
            Start with the audit to see where you stand.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/audit">
              <Button
                variant="hero"
                onClick={() => track("cta_click_audit", { placement: "about_cta" })}
              >
                Start your audit
                <ArrowRight size={18} />
              </Button>
            </Link>
            <Link to="/contact">
              <Button
                variant="heroOutline"
                onClick={() => track("cta_click_contact", { placement: "about_cta" })}
              >
                Get in touch
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
