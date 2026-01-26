import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check, Clock, FileText, Video } from "lucide-react";
import { SEO, WebPageSchema } from "@/components/layout/SEO";

export default function HowItWorks() {
  const layers = [
    {
      number: "01",
      title: "Discovery & Scoping",
      input: "Business context, priority buyer questions, competitor list",
      method: "Stakeholder interview, question mapping, baseline measurement",
      output: "Audit scope document, 20 validated questions",
    },
    {
      number: "02",
      title: "Multi-LLM Testing",
      input: "Question set, competitor names, current content",
      method: "Systematic prompting across ChatGPT, Claude, and Gemini",
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
      title: "Recommendation Development",
      input: "Analysis results, client capabilities",
      method: "Prioritization framework, effort/impact mapping",
      output: "Ranked action roadmap, quick wins, strategic initiatives",
    },
    {
      number: "05",
      title: "Delivery & Review",
      input: "Complete audit package",
      method: "Executive summary, detailed findings, walkthrough session",
      output: "PDF report, optional 30-min video walkthrough",
    },
  ];

  const deliverables = [
    { icon: FileText, title: "Executive Summary", description: "2-page overview for leadership" },
    { icon: FileText, title: "Full Audit Report", description: "Detailed findings with screenshots" },
    { icon: FileText, title: "Competitive Matrix", description: "Your position vs. 3 competitors" },
    { icon: FileText, title: "Action Roadmap", description: "Prioritized recommendations" },
    { icon: Video, title: "Video Walkthrough", description: "30-min recorded explanation (optional)" },
    { icon: FileText, title: "Quick Wins List", description: "Immediate actions to implement" },
  ];

  const challenges = [
    {
      challenge: "LLMs don't index websites like search engines",
      implication: "SEO rankings don't translate to AI visibility",
    },
    {
      challenge: "Training data is months or years old",
      implication: "Recent changes aren't reflected immediately",
    },
    {
      challenge: "Each LLM has different training sources",
      implication: "Optimization must work across multiple models",
    },
    {
      challenge: "Responses are generated, not retrieved",
      implication: "Citation-worthy structure is essential",
    },
  ];

  const timelines = [
    { name: "Sprint", duration: "1-2 weeks", scope: "Audit only", price: "€500" },
    { name: "Program", duration: "4-8 weeks", scope: "Audit + Implementation", price: "Custom" },
    { name: "Retainer", duration: "Ongoing", scope: "Monitoring + Optimization", price: "Monthly" },
  ];

  return (
    <>
      <SEO
        title="How It Works"
        description="Our five-layer methodology for measuring and improving AI visibility. From audit to implementation to ongoing monitoring."
        canonical="/how-it-works"
      />
      <WebPageSchema
        title="How It Works"
        description="Our five-layer methodology for measuring and improving AI visibility."
        url="/how-it-works"
      />

      {/* Hero */}
      <section className="section-slide pt-24 md:pt-32">
        <div className="container-wide">
          <p className="eyebrow mb-4">Methodology</p>
          <h1 className="mb-6 max-w-3xl">How we measure AI visibility</h1>
          <p className="lead max-w-2xl">
            A structured, repeatable process that delivers actionable insights in 5-7 business days.
          </p>
        </div>
      </section>

      {/* TL;DR */}
      <section className="section-slide bg-secondary/30">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto text-center">
            <p className="eyebrow mb-4">TL;DR</p>
            <p className="text-large">
              We test 20 strategic buyer questions across 3 major LLMs, benchmark against 3 competitors, 
              score for visibility and accuracy, and deliver a prioritized action roadmap.
            </p>
          </div>
        </div>
      </section>

      {/* Five Layers */}
      <section className="section-slide">
        <div className="container-wide">
          <p className="eyebrow mb-4">Five-Layer Method</p>
          <h2 className="mb-12">Input → Method → Output</h2>
          
          <div className="space-y-8">
            {layers.map((layer, index) => (
              <div key={index} className="card-minimal grid md:grid-cols-4 gap-6 items-start">
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

      {/* Deliverables */}
      <section className="section-slide bg-secondary/30">
        <div className="container-wide">
          <p className="eyebrow mb-4">Deliverables</p>
          <h2 className="mb-12">What you receive</h2>
          
          <div className="grid-3-col">
            {deliverables.map((item, index) => (
              <div key={index} className="flex items-start gap-4">
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

      {/* Why This Is Hard */}
      <section className="section-slide">
        <div className="container-wide">
          <p className="eyebrow mb-4">Why Traditional Marketing Fails</p>
          <h2 className="mb-12 max-w-2xl">LLMs work differently than search engines</h2>
          
          <div className="grid-2-col max-w-4xl">
            {challenges.map((item, index) => (
              <div key={index} className="card-minimal">
                <h3 className="text-lg mb-3">{item.challenge}</h3>
                <p className="text-muted-foreground">{item.implication}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Bands */}
      <section className="section-slide bg-secondary/30">
        <div className="container-wide">
          <p className="eyebrow mb-4">Engagement Options</p>
          <h2 className="mb-12">Choose your timeline</h2>
          
          <div className="grid-3-col">
            {timelines.map((timeline, index) => (
              <div key={index} className="card-minimal bg-background">
                <div className="flex items-center gap-2 mb-4">
                  <Clock size={16} className="text-muted-foreground" />
                  <span className="text-small">{timeline.duration}</span>
                </div>
                <h3 className="mb-2">{timeline.name}</h3>
                <p className="text-muted-foreground mb-4">{timeline.scope}</p>
                <p className="text-2xl font-serif font-semibold">{timeline.price}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-slide">
        <div className="container-wide text-center">
          <h2 className="mb-6">Ready to start?</h2>
          <p className="lead max-w-xl mx-auto mb-10">
            The €500 audit is the fastest way to understand your AI visibility position.
          </p>
          <Link to="/audit">
            <Button variant="hero">
              Start your audit
              <ArrowRight size={18} />
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
}
