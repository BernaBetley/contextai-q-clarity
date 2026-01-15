import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, Clock } from "lucide-react";
import { CheckoutButton } from "./CheckoutButton";

export const metadata: Metadata = {
  title: "AI Visibility Audit — €500",
  description:
    "Fixed-scope AI visibility audit: 20 queries, 4 LLMs, 3 competitors. Delivered in 5–7 business days. Actionable roadmap included.",
  alternates: { canonical: "/audit" },
};

const included = [
  "20 strategic queries tested across your category",
  "4 LLMs evaluated: ChatGPT, Claude, Gemini, Perplexity",
  "3 competitors benchmarked",
  "Visibility scoring (0-100) per query",
  "Accuracy assessment with hallucination flagging",
  "Citation and source analysis",
  "Competitive positioning matrix",
  "Prioritized action roadmap",
  "PDF report with screenshots",
  "Optional 30-minute walkthrough call",
];

const isNot = [
  "Not a one-time SEO audit",
  "Not a content marketing strategy",
  "Not an implementation service (available separately)",
  "Not ongoing monitoring (retainer available)",
];

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

export default function AuditPage() {
  const intakeUrl = process.env.NEXT_PUBLIC_AUDIT_INTAKE_URL;

  return (
    <>
      <ServiceSchema />

      {/* Hero */}
      <section className="section-slide pt-24 md:pt-32">
        <div className="container-wide">
          <div className="grid-2-col items-center">
            <div>
              <p className="eyebrow mb-4">Start Here</p>
              <h1 className="mb-6">AI Visibility Audit</h1>
              <p className="lead mb-8">
                Understand exactly how your brand appears—or doesn&apos;t—in AI-generated answers. Fixed scope, clear
                deliverables, actionable roadmap.
              </p>
              <div className="flex items-baseline gap-3 mb-8">
                <span className="text-6xl font-serif font-semibold">€500</span>
                <span className="text-muted-foreground text-lg">one-time</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground mb-8">
                <Clock size={18} />
                <span>Delivered in 5–7 business days</span>
              </div>

              {process.env.STRIPE_AUDIT_PRICE_ID ? (
                <CheckoutButton label="Purchase Audit" />
              ) : (
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-8 py-6 text-base font-medium text-primary-foreground shadow-elevated transition-all duration-200 hover:shadow-prominent hover:-translate-y-0.5 active:translate-y-0"
                >
                  Request invoice / pay by bank transfer <ArrowRight size={18} />
                </Link>
              )}

              <p className="text-small mt-4">Stripe payment. Invoice provided.</p>
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

      {/* Guardrails */}
      <section className="section-slide">
        <div className="container-wide">
          <div className="grid-2-col">
            <div>
              <p className="eyebrow mb-4">Guardrails</p>
              <h2 className="mb-6">What this is not</h2>
              <div className="space-y-4">
                {isNot.map((item) => (
                  <div key={item} className="flex items-start gap-3 p-4 bg-secondary/50 rounded-lg">
                    <span className="text-muted-foreground flex-shrink-0 mt-0.5">—</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="eyebrow mb-4">Next</p>
              <h2 className="mb-6">What happens after you purchase</h2>
              <div className="card-minimal">
                <ol className="space-y-4">
                  <li className="flex items-start gap-4">
                    <span className="text-2xl font-serif font-semibold text-muted-foreground">01</span>
                    <div>
                      <p className="font-medium mb-1">Purchase</p>
                      <p className="text-small">Complete the €500 payment. We send an invoice automatically.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="text-2xl font-serif font-semibold text-muted-foreground">02</span>
                    <div>
                      <p className="font-medium mb-1">Intake</p>
                      <p className="text-small">
                        Share company context, target queries, competitors, and priorities so we can scope the 20 queries
                        precisely.
                      </p>
                      {intakeUrl ? (
                        <a href={intakeUrl} target="_blank" rel="noopener noreferrer">
                          <span className="inline-flex items-center justify-center gap-2 rounded-md border border-foreground bg-transparent px-5 py-2 text-sm font-medium text-foreground transition-all duration-200 hover:bg-foreground hover:text-background mt-3">
                            Open intake form <ArrowRight size={16} />
                          </span>
                        </a>
                      ) : (
                        <p className="text-small mt-3 text-muted-foreground">
                          Intake link is provided in your confirmation email. If you don’t receive it, email{" "}
                          <a className="text-foreground underline underline-offset-4" href="mailto:hello@contextaiq.com">
                            hello@contextaiq.com
                          </a>
                          .
                        </p>
                      )}
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="text-2xl font-serif font-semibold text-muted-foreground">03</span>
                    <div>
                      <p className="font-medium mb-1">Delivery</p>
                      <p className="text-small">
                        You receive the PDF report + competitive matrix + prioritized roadmap. Optional 30-minute
                        walkthrough included.
                      </p>
                    </div>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-slide bg-secondary/30">
        <div className="container-wide text-center">
          <h2 className="mb-6">Ready to see where you stand?</h2>
          <p className="lead max-w-xl mx-auto mb-10">€500. Fixed scope. Delivered in 5–7 business days.</p>
          {process.env.STRIPE_AUDIT_PRICE_ID ? (
            <div className="flex justify-center">
              <CheckoutButton label="Start your audit" />
            </div>
          ) : (
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-8 py-6 text-base font-medium text-primary-foreground shadow-elevated transition-all duration-200 hover:shadow-prominent hover:-translate-y-0.5 active:translate-y-0"
            >
              Request invoice / pay by bank transfer <ArrowRight size={18} />
            </Link>
          )}
        </div>
      </section>
    </>
  );
}

