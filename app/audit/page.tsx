import type { Metadata } from "next";
import { ArrowRight, Check, Clock } from "lucide-react";

import { FaqSchema, ServiceSchema } from "../components/StructuredData";
import { TrackedLink } from "../components/TrackedLink";
import { env } from "../lib/env.server";
import { buildMetadata } from "../lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "AI Visibility Audit — €500",
  description:
    "Fixed-scope AI visibility audit: 20 strategic questions, 4 LLMs, 3 competitors. Delivered in 5–7 business days with a prioritized action roadmap.",
  path: "/audit",
});

const included = [
  "20 strategic buyer questions across brand, category, and use-case intent",
  "4 LLMs evaluated: ChatGPT, Claude, Gemini, Perplexity",
  "3 competitors benchmarked using the same question set",
  "Visibility scorecard (0–100) with question-level breakdowns",
  "Accuracy and hallucination log with evidence",
  "Citation and source analysis to identify authority gaps",
  "Competitive positioning matrix",
  "Prioritized action roadmap (quick wins + structural fixes)",
  "PDF report with screenshots and annotated evidence",
  "Optional 30-minute walkthrough call",
];

const isNot = [
  "Not a generic SEO audit or keyword report",
  "Not a content marketing strategy or editorial calendar",
  "Not an implementation service (available separately)",
  "Not ongoing monitoring (retainer available)",
];
const sampleOutputs = [
  {
    title: "Executive summary",
    description: "One-page snapshot of visibility, accuracy, and competitive positioning.",
  },
  {
    title: "Visibility scorecard",
    description: "Question-level scores across each LLM with clear baselines.",
  },
  {
    title: "Evidence archive",
    description: "Screenshots of responses and citations for decision-ready proof.",
  },
  {
    title: "Action roadmap",
    description: "Sequenced recommendations by impact and effort.",
  },
];

const faqs = [
  {
    question: "Who is the audit for?",
    answer:
      "B2B founders, CMOs, growth, and SEO/AI leads who need to know how their brand appears in AI-generated answers.",
  },
  {
    question: "What do you need from us?",
    answer:
      "Company context, priority buyer questions, competitor list, and any existing fact sheets or source materials.",
  },
  {
    question: "Can we move directly to implementation?",
    answer:
      "Yes. The audit becomes the scoped brief for implementation and monitoring, with clear priorities and timelines.",
  },
  {
    question: "Is the audit reusable?",
    answer:
      "Yes. You can repeat it quarterly or after major product changes to benchmark progress.",
  },
];

export default function AuditPage() {
  const stripeCheckoutUrl = env.NEXT_PUBLIC_STRIPE_CHECKOUT_URL;
  const intakeUrl = env.NEXT_PUBLIC_AUDIT_INTAKE_URL;
  const hasDirectStripe = Boolean(env.STRIPE_SECRET_KEY && env.STRIPE_AUDIT_PRICE_ID);

  return (
    <>
      <ServiceSchema
        name="AI Visibility Audit"
        description="Fixed-scope audit measuring your brand's visibility and accuracy across ChatGPT, Claude, Gemini, and Perplexity."
        price="500"
        url="/audit"
      />
      <FaqSchema items={faqs} />

      {/* Hero */}
      <section className="section-slide pt-24 md:pt-32">
        <div className="container-wide">
          <div className="grid-2-col items-center">
            <div>
              <p className="eyebrow mb-4">Start Here</p>
              <h1 className="mb-6">AI Visibility Audit</h1>
              <p className="lead mb-8">
                Quantify how your brand appears in AI-generated answers, with evidence and a prioritized roadmap. Fixed scope,
                delivered in 5–7 business days.
              </p>
              <div className="flex items-baseline gap-3 mb-8">
                <span className="text-6xl font-serif font-semibold">€500</span>
                <span className="text-muted-foreground text-lg">one-time</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground mb-8">
                <Clock size={18} />
                <span>Delivered in 5–7 business days</span>
              </div>

              {stripeCheckoutUrl ? (
                <TrackedLink
                  href={stripeCheckoutUrl}
                  external
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary btn-lg"
                  eventName="cta_click"
                  eventParams={{ location: "audit_hero", cta: "Purchase audit" }}
                >
                  Purchase audit <ArrowRight size={18} />
                </TrackedLink>
              ) : hasDirectStripe ? (
                <TrackedLink
                  href="/api/stripe/checkout?product=audit"
                  className="btn btn-primary btn-lg"
                  eventName="cta_click"
                  eventParams={{ location: "audit_hero", cta: "Purchase audit" }}
                >
                  Purchase audit <ArrowRight size={18} />
                </TrackedLink>
              ) : (
                <TrackedLink
                  href="/contact"
                  className="btn btn-primary btn-lg"
                  eventName="cta_click"
                  eventParams={{ location: "audit_hero", cta: "Request invoice" }}
                >
                  Request invoice / pay by bank transfer <ArrowRight size={18} />
                </TrackedLink>
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
                        Share company context, priority buyer questions, competitors, and priorities so we can scope the 20 questions
                        precisely.
                      </p>
                      {intakeUrl ? (
                        <TrackedLink
                          href={intakeUrl}
                          external
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-secondary btn-sm mt-3"
                          eventName="cta_click"
                          eventParams={{ location: "audit_intake", cta: "Open intake form" }}
                        >
                          Open intake form <ArrowRight size={16} />
                        </TrackedLink>
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

      <section className="section-slide bg-secondary/30">
        <div className="container-wide">
          <p className="eyebrow mb-4">Sample output</p>
          <h2 className="mb-12">What you receive</h2>
          <div className="grid-2-col">
            {sampleOutputs.map((item) => (
              <div key={item.title} className="card-minimal bg-background">
                <h3 className="text-lg mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-slide">
        <div className="container-wide">
          <p className="eyebrow mb-4">FAQ</p>
          <h2 className="mb-12">Questions we hear often</h2>
          <div className="grid-2-col">
            {faqs.map((item) => (
              <div key={item.question} className="card-minimal">
                <h3 className="text-lg mb-3">{item.question}</h3>
                <p className="text-muted-foreground text-sm">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-slide bg-secondary/30">
        <div className="container-wide text-center">
          <h2 className="mb-6">Ready to see where you stand?</h2>
          <p className="lead max-w-xl mx-auto mb-10">€500. Fixed scope. Delivered in 5–7 business days.</p>
              {stripeCheckoutUrl ? (
            <TrackedLink
              href={stripeCheckoutUrl}
              external
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary btn-lg"
              eventName="cta_click"
              eventParams={{ location: "audit_final", cta: "Start your audit" }}
            >
              Start your audit <ArrowRight size={18} />
            </TrackedLink>
              ) : hasDirectStripe ? (
                <TrackedLink
                  href="/api/stripe/checkout?product=audit"
                  className="btn btn-primary btn-lg"
                  eventName="cta_click"
                  eventParams={{ location: "audit_final", cta: "Start your audit" }}
                >
                  Start your audit <ArrowRight size={18} />
                </TrackedLink>
          ) : (
            <TrackedLink
              href="/contact"
              className="btn btn-primary btn-lg"
              eventName="cta_click"
              eventParams={{ location: "audit_final", cta: "Request invoice" }}
            >
              Request invoice / pay by bank transfer <ArrowRight size={18} />
            </TrackedLink>
          )}
        </div>
      </section>
    </>
  );
}

