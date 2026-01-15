import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Activity, BarChart3, Search, Share2 } from "lucide-react";

export const metadata: Metadata = {
  title: "AI Visibility Audit",
  description:
    "We measure and improve how your organization appears in AI-generated answers. Start with a €500 fixed-scope AI Visibility Audit.",
  alternates: { canonical: "/" },
};

function Section({
  children,
  className = "",
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={`section-slide ${className}`}>
      <div className="container-wide">{children}</div>
    </section>
  );
}

function HeroSection() {
  return (
    <Section className="pt-24 md:pt-32">
      <div className="max-w-4xl">
        <p className="eyebrow mb-4 animate-fade-in">AI Visibility Advisory</p>
        <h1 className="mb-6 animate-fade-in" style={{ animationDelay: "0.1s" }}>
          Are LLMs getting your brand right?
        </h1>
        <p className="lead max-w-2xl mb-10 animate-fade-in" style={{ animationDelay: "0.2s" }}>
          We measure and optimize how your organization appears in AI-generated answers. Fixed-scope audit. Measurable
          outcomes. No guesswork.
        </p>
        <div className="flex flex-wrap gap-4 animate-fade-in" style={{ animationDelay: "0.3s" }}>
          <Link
            href="/audit"
            className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-8 py-6 text-base font-medium text-primary-foreground shadow-elevated transition-all duration-200 hover:shadow-prominent hover:-translate-y-0.5 active:translate-y-0"
          >
            Run €500 Audit <ArrowRight size={18} />
          </Link>
          <Link
            href="/how-it-works"
            className="inline-flex items-center justify-center rounded-md border-2 border-foreground bg-transparent px-8 py-6 text-base font-medium text-foreground transition-all duration-200 hover:bg-foreground hover:text-background"
          >
            See methodology
          </Link>
        </div>
      </div>
    </Section>
  );
}

function ExecutiveSummary() {
  const points = [
    "AI assistants increasingly shape how buyers research categories and vendors.",
    "Brands often appear inaccurately, incompletely, or not at all in AI-generated answers.",
    "This requires different tactics than traditional SEO: structure, authority, and citation-ready content.",
  ];

  return (
    <Section>
      <div className="max-w-3xl mx-auto">
        <p className="eyebrow mb-4 text-center">Executive Summary</p>
        <div className="space-y-6">
          {points.map((point, index) => (
            <div key={point} className="flex items-start gap-4 p-6 bg-secondary/50 rounded-lg">
              <span className="text-2xl font-serif font-semibold text-muted-foreground">
                {(index + 1).toString().padStart(2, "0")}
              </span>
              <p className="text-large">{point}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

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

  return (
    <Section>
      <p className="eyebrow mb-4">What's at Stake</p>
      <h2 className="mb-12 max-w-2xl">The AI discovery gap is widening</h2>

      <div className="grid-3-col">
        {risks.map((risk) => (
          <div key={risk.title} className="card-minimal">
            <h3 className="mb-3">{risk.title}</h3>
            <p className="text-muted-foreground">{risk.description}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

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
        {steps.map((step) => (
          <div key={step.title} className="card-minimal">
            <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center mb-4">
              <step.icon size={24} />
            </div>
            <p className="eyebrow mb-1">{step.phase}</p>
            <h3 className="text-lg mb-4">{step.title}</h3>
            <ul className="space-y-2">
              {step.deliverables.map((item) => (
                <li key={item} className="text-small flex items-start gap-2">
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
          <p className="lead mb-8">Fixed scope. Clear deliverables. Actionable insights in 5-7 business days.</p>
          <div className="flex items-baseline gap-2 mb-8">
            <span className="text-5xl font-serif font-semibold">€500</span>
            <span className="text-muted-foreground">one-time</span>
          </div>
          <Link
            href="/audit"
            className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-8 py-6 text-base font-medium text-primary-foreground shadow-elevated transition-all duration-200 hover:shadow-prominent hover:-translate-y-0.5 active:translate-y-0"
          >
            Start your audit <ArrowRight size={18} />
          </Link>
        </div>
        <div className="card-minimal">
          <h3 className="mb-6">What's included</h3>
          <ul className="space-y-4">
            {scope.map((item) => (
              <li key={item} className="flex items-start gap-3">
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

function FinalCTA() {
  return (
    <Section>
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="mb-6">Ready to become visible?</h2>
        <p className="lead mb-10">
          Start with a fixed-scope audit. Understand exactly where you stand in AI-generated answers.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/audit"
            className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-8 py-6 text-base font-medium text-primary-foreground shadow-elevated transition-all duration-200 hover:shadow-prominent hover:-translate-y-0.5 active:translate-y-0"
          >
            Run €500 Audit <ArrowRight size={18} />
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-md border-2 border-foreground bg-transparent px-8 py-6 text-base font-medium text-foreground transition-all duration-200 hover:bg-foreground hover:text-background"
          >
            Get in touch
          </Link>
        </div>
      </div>
    </Section>
  );
}

function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "ContextAI Q",
    url: "https://contextaiq.com",
    logo: "https://contextaiq.com/contextaiq_logo_bw.svg",
    description: "Making brands visible and accurately represented in AI-generated answers.",
    address: { "@type": "PostalAddress", addressCountry: "PT" },
    sameAs: [],
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}

function WebSiteSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "ContextAI Q",
    url: "https://contextaiq.com",
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}

function ServiceSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "AI Visibility Audit",
    provider: { "@type": "Organization", name: "ContextAI Q" },
    description:
      "Fixed-scope audit measuring your brand's visibility and accuracy across major LLMs including ChatGPT, Claude, Gemini, and Perplexity.",
    offers: { "@type": "Offer", price: "500", priceCurrency: "EUR" },
    areaServed: "Worldwide",
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}

export default function HomePage() {
  return (
    <>
      <OrganizationSchema />
      <WebSiteSchema />
      <ServiceSchema />

      <HeroSection />
      <ExecutiveSummary />
      <StakesSection />
      <HowWeHelpSection />
      <ProductOfferSection />
      <FinalCTA />
    </>
  );
}
