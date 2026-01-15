import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, Clock, Shield, FileText, Users } from "lucide-react";
import { FAQ, FAQSchema, type FAQItem } from "../components/FAQ";

export const metadata: Metadata = {
  title: "AI Visibility Audit — €500 Fixed-Scope Assessment",
  description:
    "Get a complete picture of your brand's AI visibility. 20 queries tested across ChatGPT, Claude, Gemini, and Perplexity. 3 competitors benchmarked. Prioritized roadmap included. Delivered in 5-7 business days.",
  alternates: { canonical: "/audit" },
  keywords: ["AI visibility audit", "LLM audit", "ChatGPT visibility", "AI SEO audit", "brand AI assessment"],
};

const included = [
  "20 strategic queries tested across your category",
  "4 LLMs evaluated: ChatGPT, Claude, Gemini, Perplexity",
  "3 competitors benchmarked head-to-head",
  "Visibility scoring (0-100) per query and LLM",
  "Accuracy assessment with hallucination flagging",
  "Citation and source analysis",
  "Competitive positioning matrix",
  "Prioritized action roadmap (quick wins + strategic)",
  "PDF report with screenshots and evidence",
  "Optional 30-minute walkthrough call",
];

const notIncluded = [
  "Not a traditional SEO audit (though findings may overlap)",
  "Not a content strategy document (recommendations only)",
  "Not implementation services (available separately)",
  "Not ongoing monitoring (retainer available)",
];

const faqItems: FAQItem[] = [
  {
    question: "What queries will you test?",
    answer:
      "We work with you to select 20 strategic queries across four categories: brand queries (your company name), category queries (your market), competitive queries (vs. alternatives), and use-case queries (problems you solve). The intake form helps us understand your priorities.",
  },
  {
    question: "How long does the audit take?",
    answer:
      "5-7 business days from when we receive your completed intake form. This includes query validation, multi-LLM testing, analysis, and report preparation. Rush delivery may be available—contact us to discuss.",
  },
  {
    question: "What format is the report?",
    answer:
      "You receive a comprehensive PDF report (~20-30 pages) including: executive summary, per-query scorecards, competitive matrix, screenshot evidence, root cause analysis, and prioritized action roadmap. We can also provide a 30-minute walkthrough call to discuss findings.",
  },
  {
    question: "Can I choose which competitors to benchmark?",
    answer:
      "Yes. You specify up to 3 competitors in the intake form. We recommend choosing your most direct alternatives—the ones prospects are likely comparing you against.",
  },
];

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
      priceValidUntil: "2026-12-31",
    },
    areaServed: "Worldwide",
    serviceType: "AI Visibility Consulting",
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}

export default function AuditPage() {
  const stripeCheckoutUrl = process.env.NEXT_PUBLIC_STRIPE_CHECKOUT_URL;
  const intakeUrl = process.env.NEXT_PUBLIC_AUDIT_INTAKE_URL;

  return (
    <>
      <ServiceSchema />
      <FAQSchema items={faqItems} />

      {/* Hero */}
      <section className="section-slide pt-24 md:pt-32">
        <div className="container-wide">
          <div className="grid-2-col items-center">
            <div>
              <p className="eyebrow mb-4">Start Here</p>
              <h1 className="mb-6">AI Visibility Audit</h1>
              <p className="lead mb-8">
                Understand exactly how your brand appears—or doesn&apos;t—in AI-generated answers. 
                Fixed scope, clear deliverables, actionable roadmap.
              </p>
              <div className="flex items-baseline gap-3 mb-4">
                <span className="text-6xl font-serif font-semibold">€500</span>
                <span className="text-muted-foreground text-lg">one-time</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground mb-8">
                <Clock size={18} />
                <span>Delivered in 5–7 business days</span>
              </div>

              {stripeCheckoutUrl ? (
                <a
                  href={stripeCheckoutUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-8 py-4 text-base font-medium text-primary-foreground shadow-elevated transition-all duration-200 hover:shadow-prominent hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  Purchase Audit <ArrowRight size={18} />
                </a>
              ) : (
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-8 py-4 text-base font-medium text-primary-foreground shadow-elevated transition-all duration-200 hover:shadow-prominent hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  Request Audit <ArrowRight size={18} />
                </Link>
              )}

              <p className="text-small mt-4">Stripe payment. Invoice provided. No subscription required.</p>
            </div>

            <div className="card-minimal">
              <h3 className="mb-6">What&apos;s included</h3>
              <ul className="space-y-3">
                {included.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Check size={18} className="text-foreground flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Signals */}
      <section className="section-slide bg-secondary/30">
        <div className="container-wide">
          <div className="grid-3-col">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-background flex items-center justify-center flex-shrink-0 shadow-subtle">
                <Shield size={24} />
              </div>
              <div>
                <h3 className="text-lg mb-2">Fixed Scope, Fixed Price</h3>
                <p className="text-muted-foreground">
                  €500 covers everything listed. No upsells, no scope creep, no surprises.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-background flex items-center justify-center flex-shrink-0 shadow-subtle">
                <FileText size={24} />
              </div>
              <div>
                <h3 className="text-lg mb-2">Transparent Methodology</h3>
                <p className="text-muted-foreground">
                  Our <Link href="/method" className="underline underline-offset-4 hover:text-foreground">8-step process</Link> is documented. 
                  You see exactly how we measure.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-background flex items-center justify-center flex-shrink-0 shadow-subtle">
                <Users size={24} />
              </div>
              <div>
                <h3 className="text-lg mb-2">Built for B2B</h3>
                <p className="text-muted-foreground">
                  Designed for founders, CMOs, and growth leads who need actionable insights, not reports.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Guardrails + Process */}
      <section className="section-slide">
        <div className="container-wide">
          <div className="grid-2-col">
            <div>
              <p className="eyebrow mb-4">Scope Clarity</p>
              <h2 className="mb-6">What this is not</h2>
              <div className="space-y-4">
                {notIncluded.map((item) => (
                  <div key={item} className="flex items-start gap-3 p-4 bg-secondary/50 rounded-lg">
                    <span className="text-muted-foreground flex-shrink-0 mt-0.5">—</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <p className="text-small mt-6">
                Need implementation or ongoing monitoring?{" "}
                <Link href="/services" className="underline underline-offset-4 hover:text-foreground">
                  See all services
                </Link>
              </p>
            </div>
            <div>
              <p className="eyebrow mb-4">Process</p>
              <h2 className="mb-6">How it works</h2>
              <div className="card-minimal">
                <ol className="space-y-6">
                  <li className="flex items-start gap-4">
                    <span className="text-2xl font-serif font-semibold text-muted-foreground">01</span>
                    <div>
                      <p className="font-medium mb-1">Purchase</p>
                      <p className="text-small">Complete the €500 payment. Invoice sent automatically.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="text-2xl font-serif font-semibold text-muted-foreground">02</span>
                    <div>
                      <p className="font-medium mb-1">Intake</p>
                      <p className="text-small">
                        Share company context, target queries, competitors, and priorities.
                      </p>
                      {intakeUrl && (
                        <a
                          href={intakeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-sm text-foreground underline underline-offset-4 mt-2 hover:text-muted-foreground"
                        >
                          Preview intake form <ArrowRight size={14} />
                        </a>
                      )}
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="text-2xl font-serif font-semibold text-muted-foreground">03</span>
                    <div>
                      <p className="font-medium mb-1">Testing</p>
                      <p className="text-small">
                        We execute all 20 queries across ChatGPT, Claude, Gemini, and Perplexity.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="text-2xl font-serif font-semibold text-muted-foreground">04</span>
                    <div>
                      <p className="font-medium mb-1">Delivery</p>
                      <p className="text-small">
                        Receive PDF report + competitive matrix + roadmap. Optional walkthrough call.
                      </p>
                    </div>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-slide bg-secondary/30">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto">
            <p className="eyebrow mb-4 text-center">Questions</p>
            <h2 className="mb-12 text-center">About the audit</h2>
            <FAQ items={faqItems} />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-slide">
        <div className="container-wide text-center">
          <h2 className="mb-6">Ready to see where you stand?</h2>
          <p className="lead max-w-xl mx-auto mb-10">
            €500 · Fixed scope · Delivered in 5–7 business days
          </p>
          {stripeCheckoutUrl ? (
            <a
              href={stripeCheckoutUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-8 py-4 text-base font-medium text-primary-foreground shadow-elevated transition-all duration-200 hover:shadow-prominent hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              Start your audit <ArrowRight size={18} />
            </a>
          ) : (
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-8 py-4 text-base font-medium text-primary-foreground shadow-elevated transition-all duration-200 hover:shadow-prominent hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              Request audit <ArrowRight size={18} />
            </Link>
          )}
          <p className="text-small mt-6">
            Questions first?{" "}
            <Link href="/contact" className="underline underline-offset-4 hover:text-foreground">
              Get in touch
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
