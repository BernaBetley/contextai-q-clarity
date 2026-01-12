import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Search, BarChart3, Share2, Activity } from "lucide-react";
import { SEO, OrganizationSchema, WebSiteSchema, ServiceSchema } from "@/components/layout/SEO";

// Section component for print-friendly slides
function Section({ 
  children, 
  className = "",
  id 
}: { 
  children: React.ReactNode; 
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={`section-slide ${className}`}>
      <div className="container-wide">
        {children}
      </div>
    </section>
  );
}

// Hero Section
function HeroSection() {
  return (
    <Section className="pt-24 md:pt-32">
      <div className="max-w-4xl">
        <p className="eyebrow mb-4 animate-fade-in">AI Visibility Advisory</p>
        <h1 className="mb-6 animate-fade-in" style={{ animationDelay: "0.1s" }}>
          Are LLMs getting your brand right?
        </h1>
        <p className="lead max-w-2xl mb-10 animate-fade-in" style={{ animationDelay: "0.2s" }}>
          We measure and optimize how your organization appears in AI-generated answers. 
          Fixed-scope audit. Measurable outcomes. No guesswork.
        </p>
        <div className="flex flex-wrap gap-4 animate-fade-in" style={{ animationDelay: "0.3s" }}>
          <Link to="/audit">
            <Button variant="hero">
              Run €500 Audit
              <ArrowRight size={18} />
            </Button>
          </Link>
          <Link to="/how-it-works">
            <Button variant="heroOutline">
              See methodology
            </Button>
          </Link>
        </div>
      </div>
    </Section>
  );
}

// Executive Summary
function ExecutiveSummary() {
  const points = [
    "ChatGPT, Claude, and Perplexity now answer 40%+ of product research queries.",
    "Most brands appear inaccurately, incompletely, or not at all in these responses.",
    "Traditional SEO does not fix this. LLMs require structured, citation-ready content.",
  ];

  return (
    <Section>
      <div className="max-w-3xl mx-auto">
        <p className="eyebrow mb-4 text-center">Executive Summary</p>
        <div className="space-y-6">
          {points.map((point, index) => (
            <div 
              key={index}
              className="flex items-start gap-4 p-6 bg-secondary/50 rounded-lg"
            >
              <span className="text-2xl font-serif font-semibold text-muted-foreground">
                {(index + 1).toString().padStart(2, '0')}
              </span>
              <p className="text-large">{point}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

// What's at Stake
function StakesSection() {
  const risks = [
    {
      title: "Invisibility",
      description: "Your brand is absent from AI-generated recommendations in your category.",
    },
    {
      title: "Inaccuracy", 
      description: "LLMs present outdated or incorrect information about your products and services.",
    },
    {
      title: "Displacement",
      description: "Competitors appear prominently while you remain unlisted or misrepresented.",
    },
  ];

  const stats = [
    { value: "63%", label: "of consumers now start product research with AI tools", source: "[Source placeholder]" },
    { value: "47%", label: "of B2B buyers use AI assistants for vendor research", source: "[Source placeholder]" },
  ];

  return (
    <Section>
      <p className="eyebrow mb-4">What's at Stake</p>
      <h2 className="mb-12 max-w-2xl">The AI discovery gap is widening</h2>
      
      <div className="grid-3-col mb-16">
        {risks.map((risk, index) => (
          <div key={index} className="card-minimal">
            <h3 className="mb-3">{risk.title}</h3>
            <p className="text-muted-foreground">{risk.description}</p>
          </div>
        ))}
      </div>

      <div className="grid-2-col max-w-3xl">
        {stats.map((stat, index) => (
          <div key={index} className="text-center p-8 bg-secondary/30 rounded-lg">
            <p className="text-5xl font-serif font-semibold mb-2">{stat.value}</p>
            <p className="text-muted-foreground mb-2">{stat.label}</p>
            <p className="text-xs text-muted-foreground">{stat.source}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

// How We Help
function HowWeHelpSection() {
  const steps = [
    {
      icon: Search,
      phase: "Measure",
      title: "AI Visibility Audit",
      deliverables: ["20-query visibility scan", "Accuracy scoring", "Competitive benchmarking"],
    },
    {
      icon: BarChart3,
      phase: "Structure",
      title: "Content Architecture",
      deliverables: ["Schema markup", "Fact-sheet creation", "Citation-ready formatting"],
    },
    {
      icon: Share2,
      phase: "Distribute",
      title: "Signal Amplification",
      deliverables: ["Knowledge graph optimization", "Authority building", "Source diversification"],
    },
    {
      icon: Activity,
      phase: "Monitor",
      title: "Ongoing Tracking",
      deliverables: ["Weekly position reports", "Hallucination alerts", "Competitive tracking"],
    },
  ];

  return (
    <Section>
      <p className="eyebrow mb-4">How We Help</p>
      <h2 className="mb-12 max-w-2xl">Four-layer methodology</h2>
      
      <div className="grid-4-col">
        {steps.map((step, index) => (
          <div key={index} className="card-minimal">
            <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center mb-4">
              <step.icon size={24} />
            </div>
            <p className="eyebrow mb-1">{step.phase}</p>
            <h3 className="text-lg mb-4">{step.title}</h3>
            <ul className="space-y-2">
              {step.deliverables.map((item, i) => (
                <li key={i} className="text-small flex items-start gap-2">
                  <span className="text-muted-foreground">—</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}

// Product Offer
function ProductOfferSection() {
  const scope = [
    "20 strategic queries tested",
    "3 competitors benchmarked",
    "4 LLMs evaluated (ChatGPT, Claude, Gemini, Perplexity)",
    "Accuracy and citation analysis",
    "Prioritized action roadmap",
  ];

  return (
    <Section className="bg-secondary/30">
      <div className="grid-2-col items-center">
        <div>
          <p className="eyebrow mb-4">Start Here</p>
          <h2 className="mb-6">AI Visibility Audit</h2>
          <p className="lead mb-8">
            Fixed scope. Clear deliverables. Actionable insights in 5-7 business days.
          </p>
          <div className="flex items-baseline gap-2 mb-8">
            <span className="text-5xl font-serif font-semibold">€500</span>
            <span className="text-muted-foreground">one-time</span>
          </div>
          <Link to="/audit">
            <Button variant="hero">
              Start your audit
              <ArrowRight size={18} />
            </Button>
          </Link>
        </div>
        <div className="card-minimal">
          <h3 className="mb-6">What's included</h3>
          <ul className="space-y-4">
            {scope.map((item, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="text-foreground font-medium flex-shrink-0 mt-0.5">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}

// Services Preview
function ServicesPreview() {
  const services = [
    {
      title: "Implementation",
      description: "Custom content architecture and optimization based on audit findings.",
      pricing: "Custom scope",
    },
    {
      title: "Monitoring Retainer",
      description: "Ongoing tracking, alerts, and monthly reporting.",
      pricing: "Monthly",
    },
  ];

  return (
    <Section>
      <p className="eyebrow mb-4">Beyond the Audit</p>
      <h2 className="mb-12">Full-spectrum support</h2>
      
      <div className="grid-2-col mb-8">
        {services.map((service, index) => (
          <div key={index} className="card-minimal">
            <h3 className="mb-3">{service.title}</h3>
            <p className="text-muted-foreground mb-4">{service.description}</p>
            <p className="eyebrow">{service.pricing}</p>
          </div>
        ))}
      </div>
      
      <Link to="/services" className="inline-flex items-center gap-2 text-foreground font-medium link-underline">
        View all services <ArrowRight size={16} />
      </Link>
    </Section>
  );
}

// KPIs Preview
function KPIsPreview() {
  const kpis = [
    { name: "AI Share-of-Voice", description: "How often you appear in category queries" },
    { name: "Citation Rate", description: "Frequency of source attribution to your content" },
    { name: "Accuracy Score", description: "Correctness of information presented about you" },
    { name: "Hallucination Flags", description: "False claims detected about your brand" },
  ];

  return (
    <Section>
      <p className="eyebrow mb-4">Proof & Measurement</p>
      <h2 className="mb-12 max-w-2xl">We measure what matters</h2>
      
      <div className="grid-4-col mb-8">
        {kpis.map((kpi, index) => (
          <div key={index} className="text-center">
            <h3 className="text-lg mb-2">{kpi.name}</h3>
            <p className="text-small">{kpi.description}</p>
          </div>
        ))}
      </div>
      
      <Link to="/measurement" className="inline-flex items-center gap-2 text-foreground font-medium link-underline">
        Learn about our methodology <ArrowRight size={16} />
      </Link>
    </Section>
  );
}

// Signals Preview
function SignalsPreview() {
  const posts = [
    {
      slug: "walmart-google-ai-commerce",
      title: "Walmart × Google: AI Commerce Goes Native",
      date: "2024-01-15",
      tags: ["AI Commerce", "Google"],
    },
    {
      slug: "seo-to-ai-share-of-voice",
      title: "From SEO to AI Share-of-Voice: the new discovery funnel",
      date: "2024-01-10",
      tags: ["Strategy", "AI Discovery"],
    },
  ];

  return (
    <Section className="bg-secondary/30">
      <p className="eyebrow mb-4">Signals</p>
      <h2 className="mb-12">Latest developments</h2>
      
      <div className="grid-2-col mb-8">
        {posts.map((post, index) => (
          <Link key={index} to={`/signals/${post.slug}`} className="card-minimal hover:shadow-elevated transition-shadow">
            <div className="flex gap-2 mb-3">
              {post.tags.map((tag, i) => (
                <span key={i} className="badge-tag">{tag}</span>
              ))}
            </div>
            <h3 className="mb-2">{post.title}</h3>
            <p className="text-small">{post.date}</p>
          </Link>
        ))}
      </div>
      
      <Link to="/signals" className="inline-flex items-center gap-2 text-foreground font-medium link-underline">
        View all signals <ArrowRight size={16} />
      </Link>
    </Section>
  );
}

// Final CTA
function FinalCTA() {
  return (
    <Section>
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="mb-6">Ready to become visible?</h2>
        <p className="lead mb-10">
          Start with a fixed-scope audit. Understand exactly where you stand in AI-generated answers.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/audit">
            <Button variant="hero">
              Run €500 Audit
              <ArrowRight size={18} />
            </Button>
          </Link>
          <Link to="/contact">
            <Button variant="heroOutline">
              Get in touch
            </Button>
          </Link>
        </div>
      </div>
    </Section>
  );
}

export default function Index() {
  return (
    <>
      <SEO
        title="ContextAI Q | AI Visibility Advisory"
        description="We measure and optimize how your organization appears in AI-generated answers. Fixed-scope audit for €500. Measurable outcomes. No guesswork."
        canonical="/"
      />
      <OrganizationSchema />
      <WebSiteSchema />
      <ServiceSchema />
      
      <HeroSection />
      <ExecutiveSummary />
      <StakesSection />
      <HowWeHelpSection />
      <ProductOfferSection />
      <ServicesPreview />
      <KPIsPreview />
      <SignalsPreview />
      <FinalCTA />
    </>
  );
}
