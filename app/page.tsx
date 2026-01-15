import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Activity, BarChart3, Search, Share2, FileText, CheckCircle2 } from "lucide-react";
import { FAQ, FAQSchema, type FAQItem } from "./components/FAQ";

export const metadata: Metadata = {
  title: "AI Visibility Audit — Make Your Brand Visible in ChatGPT, Claude & Perplexity",
  description:
    "ContextAI Q measures and improves how your brand appears in AI-generated answers. €500 fixed-scope audit covers 20 queries across ChatGPT, Claude, Gemini, and Perplexity. Results in 5-7 days.",
  alternates: { canonical: "/" },
  keywords: ["AI visibility", "LLM SEO", "AI SEO", "ChatGPT visibility", "brand visibility AI", "AI discoverability"],
};

const faqItems: FAQItem[] = [
  {
    question: "How is this different from traditional SEO?",
    answer:
      "Traditional SEO optimizes for search engine rankings and click-through. AI visibility optimization focuses on how LLMs represent your brand in generated answers—whether you're mentioned, accurately described, and properly cited. The tactics overlap (structured content, authority signals) but the measurement and priorities differ.",
  },
  {
    question: "Which AI systems do you test?",
    answer:
      "We test across ChatGPT (OpenAI), Claude (Anthropic), Gemini (Google), and Perplexity. These represent the major consumer and enterprise AI assistants. Each has different training data and citation behaviors, so testing across all four gives you a complete picture.",
  },
  {
    question: "What if my brand already ranks well in Google?",
    answer:
      "Google ranking doesn't guarantee AI visibility. LLMs synthesize information differently—they may cite competitors, present outdated information, or omit you entirely even if you rank #1 for a query. Many well-ranked brands discover significant gaps in their AI presence.",
  },
  {
    question: "How do you measure 'visibility' in AI answers?",
    answer:
      "We score each response on three dimensions: Appearance (0-40 points for whether you're mentioned), Position (0-30 points for prominence in the response), and Accuracy (0-30 points for factual correctness). Total score: 0-100 per query, aggregated across LLMs.",
  },
  {
    question: "What do I receive in the audit report?",
    answer:
      "You receive a PDF report with: (1) visibility scores per query and LLM, (2) accuracy assessment with flagged errors, (3) competitive comparison matrix, (4) root cause analysis, and (5) prioritized action roadmap. Optional 30-minute walkthrough included.",
  },
  {
    question: "Can you guarantee improved AI visibility?",
    answer:
      "We don't guarantee rankings—no ethical firm does. We provide measurement, analysis, and specific recommendations. Implementation of those recommendations typically improves visibility, but results depend on your content quality, competitive landscape, and execution.",
  },
];

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
        <p className="eyebrow mb-4 animate-fade-in">AI Visibility for B2B Brands</p>
        <h1 className="mb-6 animate-fade-in" style={{ animationDelay: "0.1s" }}>
          Is your brand showing up in ChatGPT, Claude, and Perplexity?
        </h1>
        <p className="lead max-w-2xl mb-10 animate-fade-in" style={{ animationDelay: "0.2s" }}>
          We measure exactly how your organization appears in AI-generated answers—and what to do if it doesn&apos;t. 
          Fixed-scope audit. Measurable outcomes. No guesswork.
        </p>
        <div className="flex flex-wrap gap-4 animate-fade-in" style={{ animationDelay: "0.3s" }}>
          <Link
            href="/audit"
            className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-8 py-4 text-base font-medium text-primary-foreground shadow-elevated transition-all duration-200 hover:shadow-prominent hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            Get Your AI Visibility Score <ArrowRight size={18} />
          </Link>
          <Link
            href="/how-it-works"
            className="inline-flex items-center justify-center rounded-md border-2 border-foreground bg-transparent px-8 py-4 text-base font-medium text-foreground transition-all duration-200 hover:bg-foreground hover:text-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            See methodology
          </Link>
        </div>
        <p className="text-small mt-6 animate-fade-in" style={{ animationDelay: "0.4s" }}>
          €500 one-time · Results in 5-7 business days · No ongoing commitment required
        </p>
      </div>
    </Section>
  );
}

function ProblemSection() {
  const problems = [
    {
      stat: "Invisible",
      label: "Your brand is absent from AI recommendations in your category",
    },
    {
      stat: "Inaccurate",
      label: "LLMs present outdated or incorrect information about you",
    },
    {
      stat: "Displaced",
      label: "Competitors appear while you remain unlisted or misrepresented",
    },
  ];

  return (
    <Section>
      <div className="max-w-3xl mx-auto text-center mb-16">
        <p className="eyebrow mb-4">The Problem</p>
        <h2 className="mb-6">AI assistants are changing how buyers find vendors</h2>
        <p className="lead">
          When a prospect asks ChatGPT &quot;What are the best tools for X?&quot; or &quot;Who provides Y service?&quot;—are you in that answer? 
          Most brands optimized for Google discover they&apos;re invisible or misrepresented in AI.
        </p>
      </div>

      <div className="grid-3-col">
        {problems.map((problem) => (
          <div key={problem.stat} className="card-minimal text-center">
            <p className="text-4xl font-serif font-semibold mb-3">{problem.stat}</p>
            <p className="text-muted-foreground">{problem.label}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

function SolutionSection() {
  const steps = [
    {
      icon: Search,
      phase: "01. Measure",
      title: "AI Visibility Audit",
      description: "Test 20 strategic queries across 4 major LLMs. Get visibility scores, accuracy assessments, and competitive benchmarks.",
    },
    {
      icon: BarChart3,
      phase: "02. Analyze",
      title: "Root Cause Diagnosis",
      description: "Identify why gaps exist: content structure, source availability, citation patterns, knowledge graph presence.",
    },
    {
      icon: Share2,
      phase: "03. Fix",
      title: "Implementation Roadmap",
      description: "Prioritized actions ranked by impact and effort. Quick wins identified. Strategic initiatives mapped.",
    },
    {
      icon: Activity,
      phase: "04. Track",
      title: "Ongoing Monitoring",
      description: "Optional retainer for weekly position tracking, hallucination alerts, and competitive monitoring.",
    },
  ];

  return (
    <Section className="bg-secondary/30">
      <p className="eyebrow mb-4">The Solution</p>
      <h2 className="mb-6 max-w-2xl">A systematic approach to AI visibility</h2>
      <p className="lead max-w-2xl mb-12">
        We don&apos;t guess. We measure your current position, identify gaps, and provide specific actions to improve.
      </p>

      <div className="grid-2-col">
        {steps.map((step) => (
          <div key={step.title} className="flex gap-4">
            <div className="w-12 h-12 rounded-full bg-background flex items-center justify-center flex-shrink-0 shadow-subtle">
              <step.icon size={24} />
            </div>
            <div>
              <p className="eyebrow mb-1">{step.phase}</p>
              <h3 className="text-xl mb-2">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

function ProductOfferSection() {
  const included = [
    "20 strategic queries tested across your category",
    "4 LLMs evaluated: ChatGPT, Claude, Gemini, Perplexity",
    "3 competitors benchmarked head-to-head",
    "Visibility score (0-100) for each query",
    "Accuracy assessment with error flagging",
    "Prioritized action roadmap",
    "PDF report + optional 30-min walkthrough",
  ];

  return (
    <Section id="audit">
      <div className="grid-2-col items-center">
        <div>
          <p className="eyebrow mb-4">Start Here</p>
          <h2 className="mb-6">AI Visibility Audit</h2>
          <p className="lead mb-8">
            Fixed scope. Clear deliverables. Understand exactly where you stand in AI-generated answers within one week.
          </p>
          <div className="flex items-baseline gap-2 mb-8">
            <span className="text-5xl font-serif font-semibold">€500</span>
            <span className="text-muted-foreground">one-time</span>
          </div>
          <Link
            href="/audit"
            className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-8 py-4 text-base font-medium text-primary-foreground shadow-elevated transition-all duration-200 hover:shadow-prominent hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            Start your audit <ArrowRight size={18} />
          </Link>
          <p className="text-small mt-4">Delivered in 5-7 business days. Invoice provided.</p>
        </div>
        <div className="card-minimal">
          <h3 className="mb-6">What&apos;s included</h3>
          <ul className="space-y-3">
            {included.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <CheckCircle2 size={20} className="text-foreground flex-shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}

function SampleOutputSection() {
  return (
    <Section className="bg-secondary/30">
      <p className="eyebrow mb-4">Sample Output</p>
      <h2 className="mb-6 max-w-2xl">What you&apos;ll receive</h2>
      <p className="lead max-w-2xl mb-12">
        The audit delivers actionable insights, not abstract recommendations. Here&apos;s a preview of the deliverables.
      </p>

      <div className="grid-3-col">
        <div className="card-minimal bg-background">
          <FileText size={24} className="mb-4" />
          <h3 className="text-lg mb-3">Visibility Scorecard</h3>
          <div className="space-y-2 text-sm text-muted-foreground">
            <div className="flex justify-between border-b border-border pb-2">
              <span>Query</span>
              <span>Score</span>
            </div>
            <div className="flex justify-between">
              <span>&quot;Best [category] tools&quot;</span>
              <span className="font-mono">72/100</span>
            </div>
            <div className="flex justify-between">
              <span>&quot;[Your brand] vs [Competitor]&quot;</span>
              <span className="font-mono">45/100</span>
            </div>
            <div className="flex justify-between">
              <span>&quot;What is [your product]&quot;</span>
              <span className="font-mono">88/100</span>
            </div>
          </div>
        </div>

        <div className="card-minimal bg-background">
          <BarChart3 size={24} className="mb-4" />
          <h3 className="text-lg mb-3">Competitive Matrix</h3>
          <div className="space-y-2 text-sm text-muted-foreground">
            <div className="flex justify-between border-b border-border pb-2">
              <span>Brand</span>
              <span>Avg Score</span>
            </div>
            <div className="flex justify-between">
              <span>Your Brand</span>
              <span className="font-mono">62/100</span>
            </div>
            <div className="flex justify-between">
              <span>Competitor A</span>
              <span className="font-mono">78/100</span>
            </div>
            <div className="flex justify-between">
              <span>Competitor B</span>
              <span className="font-mono">54/100</span>
            </div>
          </div>
        </div>

        <div className="card-minimal bg-background">
          <Activity size={24} className="mb-4" />
          <h3 className="text-lg mb-3">Action Roadmap</h3>
          <div className="space-y-3 text-sm">
            <div className="flex items-start gap-2">
              <span className="bg-foreground text-background text-xs px-1.5 py-0.5 rounded">High</span>
              <span className="text-muted-foreground">Add structured fact sheet</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="bg-foreground text-background text-xs px-1.5 py-0.5 rounded">High</span>
              <span className="text-muted-foreground">Fix pricing page schema</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="bg-muted-foreground text-background text-xs px-1.5 py-0.5 rounded">Med</span>
              <span className="text-muted-foreground">Expand comparison content</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 text-center">
        <Link
          href="/method"
          className="inline-flex items-center justify-center gap-2 text-base font-medium text-foreground transition-colors hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-md px-4 py-2"
        >
          View full methodology <ArrowRight size={16} />
        </Link>
      </div>
    </Section>
  );
}

function FAQSection() {
  return (
    <Section id="faq">
      <div className="max-w-3xl mx-auto">
        <p className="eyebrow mb-4 text-center">Frequently Asked Questions</p>
        <h2 className="mb-12 text-center">Common questions about AI visibility</h2>
        <FAQ items={faqItems} />
      </div>
    </Section>
  );
}

function FinalCTA() {
  return (
    <Section className="bg-secondary/30">
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="mb-6">Ready to see where you stand?</h2>
        <p className="lead mb-10">
          Start with a fixed-scope audit. Get your visibility score across ChatGPT, Claude, Gemini, and Perplexity 
          within one week.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/audit"
            className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-8 py-4 text-base font-medium text-primary-foreground shadow-elevated transition-all duration-200 hover:shadow-prominent hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            Get Your €500 Audit <ArrowRight size={18} />
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-md border-2 border-foreground bg-transparent px-8 py-4 text-base font-medium text-foreground transition-all duration-200 hover:bg-foreground hover:text-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            Have questions? Get in touch
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
    description: "ContextAI Q measures and improves how brands appear in AI-generated answers from ChatGPT, Claude, Gemini, and Perplexity.",
    address: { "@type": "PostalAddress", addressCountry: "PT" },
    contactPoint: {
      "@type": "ContactPoint",
      email: "hello@contextaiq.com",
      contactType: "sales",
    },
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
    description: "AI Visibility measurement and optimization for B2B brands",
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}

function ServiceSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "AI Visibility Audit",
    provider: { "@type": "Organization", name: "ContextAI Q", url: "https://contextaiq.com" },
    description:
      "Fixed-scope audit measuring your brand's visibility and accuracy across ChatGPT, Claude, Gemini, and Perplexity. Includes 20 queries, 3 competitor benchmarks, and prioritized action roadmap.",
    offers: {
      "@type": "Offer",
      price: "500",
      priceCurrency: "EUR",
      availability: "https://schema.org/InStock",
    },
    areaServed: "Worldwide",
    serviceType: "AI Visibility Consulting",
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}

export default function HomePage() {
  return (
    <>
      <OrganizationSchema />
      <WebSiteSchema />
      <ServiceSchema />
      <FAQSchema items={faqItems} />

      <HeroSection />
      <ProblemSection />
      <SolutionSection />
      <ProductOfferSection />
      <SampleOutputSection />
      <FAQSection />
      <FinalCTA />
    </>
  );
}
