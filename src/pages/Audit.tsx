import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check, Clock, AlertCircle, HelpCircle } from "lucide-react";
import { SEO, WebPageSchema, ServiceSchema } from "@/components/layout/SEO";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function Audit() {
  const stripeCheckoutUrl = import.meta.env.VITE_STRIPE_CHECKOUT_URL as string | undefined;
  const isPaymentLinkConfigured = Boolean(stripeCheckoutUrl);
  const [isCheckoutLoading, setIsCheckoutLoading] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);

  const handleApiCheckout = async () => {
    setIsCheckoutLoading(true);
    setCheckoutError(null);

    try {
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error("Unable to start checkout.");
      }

      const data = (await response.json()) as { url?: string };

      if (!data.url) {
        throw new Error("Checkout URL missing from response.");
      }

      window.location.href = data.url;
    } catch (error) {
      setCheckoutError(error instanceof Error ? error.message : "Checkout failed.");
      setIsCheckoutLoading(false);
    }
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

  const scope = {
    queries: "20 queries",
    competitors: "3 competitors",
    llms: "4 LLMs (ChatGPT, Claude, Gemini, Perplexity)",
    timeline: "5-7 business days",
    format: "PDF report + walkthrough",
  };

  const isNot = [
    "Not a one-time SEO audit",
    "Not a content marketing strategy",
    "Not an implementation service (available separately)",
    "Not ongoing monitoring (retainer available)",
  ];

  const faqs = [
    {
      question: "How do you select the 20 queries?",
      answer: "We collaborate with you during a brief intake call to identify the most strategic queries for your business. These typically include brand queries, category queries, and competitive comparison queries.",
    },
    {
      question: "Which LLMs do you test?",
      answer: "We test across ChatGPT (GPT-4), Claude (Anthropic), Gemini (Google), and Perplexity. These represent the majority of AI-assisted search and research usage.",
    },
    {
      question: "How do you score visibility?",
      answer: "We use a 0-100 scoring system based on: appearance in response (0-40), positioning prominence (0-30), and accuracy of information (0-30).",
    },
    {
      question: "What happens after the audit?",
      answer: "You receive a prioritized roadmap. You can implement recommendations yourself, engage us for implementation, or set up ongoing monitoring.",
    },
    {
      question: "Is the walkthrough included?",
      answer: "A 30-minute video walkthrough is included at no extra cost. We can also schedule a live call if preferred.",
    },
    {
      question: "What if I need more than 20 queries?",
      answer: "Extended scope is available. Contact us for custom pricing on larger query sets or additional competitors.",
    },
  ];

  return (
    <>
      <SEO
        title="AI Visibility Audit - €500"
        description="Fixed-scope AI visibility audit. 20 queries, 4 LLMs, 3 competitors. Delivered in 5-7 business days. Actionable roadmap included."
        canonical="/audit"
      />
      <WebPageSchema
        title="AI Visibility Audit"
        description="Fixed-scope AI visibility audit for €500. Measure how you appear in AI-generated answers."
        url="/audit"
      />
      <ServiceSchema />

      {/* Hero */}
      <section className="section-slide pt-24 md:pt-32">
        <div className="container-wide">
          <div className="grid-2-col items-center">
            <div>
              <p className="eyebrow mb-4">Start Here</p>
              <h1 className="mb-6">AI Visibility Audit</h1>
              <p className="lead mb-8">
                Understand exactly how your brand appears—or doesn't—in AI-generated answers. 
                Fixed scope, clear deliverables, actionable roadmap.
              </p>
              <div className="flex items-baseline gap-3 mb-8">
                <span className="text-6xl font-serif font-semibold">€500</span>
                <span className="text-muted-foreground text-lg">one-time</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground mb-8">
                <Clock size={18} />
                <span>Delivered in 5-7 business days</span>
              </div>
              {isPaymentLinkConfigured ? (
                <a href={stripeCheckoutUrl} target="_blank" rel="noopener noreferrer">
                  <Button variant="hero" size="lg">
                    Purchase Audit
                    <ArrowRight size={18} />
                  </Button>
                </a>
              ) : (
                <Button
                  variant="hero"
                  size="lg"
                  onClick={handleApiCheckout}
                  disabled={isCheckoutLoading}
                >
                  {isCheckoutLoading ? "Starting checkout..." : "Purchase Audit"}
                  <ArrowRight size={18} />
                </Button>
              )}
              <p className="text-small mt-4">Stripe payment. Invoice provided.</p>
              {checkoutError && (
                <p className="text-small mt-2 text-destructive">{checkoutError}</p>
              )}
              {!isPaymentLinkConfigured && !checkoutError && (
                <p className="text-small mt-2 text-muted-foreground">
                  Stripe Checkout opens in a secure redirect.
                </p>
              )}
            </div>
            <div className="card-minimal">
              <h3 className="mb-6">What's included</h3>
              <ul className="space-y-3">
                {included.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check size={18} className="text-foreground flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Scope Details */}
      <section className="section-slide bg-secondary/30">
        <div className="container-wide">
          <p className="eyebrow mb-4">Fixed Scope</p>
          <h2 className="mb-12">What we test</h2>
          
          <div className="grid-4-col max-w-4xl">
            <div className="text-center">
              <p className="text-4xl font-serif font-semibold mb-2">20</p>
              <p className="text-small">Queries</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-serif font-semibold mb-2">3</p>
              <p className="text-small">Competitors</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-serif font-semibold mb-2">4</p>
              <p className="text-small">LLMs</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-serif font-semibold mb-2">5-7</p>
              <p className="text-small">Business days</p>
            </div>
          </div>
        </div>
      </section>

      {/* What You Receive */}
      <section className="section-slide">
        <div className="container-wide">
          <div className="grid-2-col">
            <div>
              <p className="eyebrow mb-4">Deliverables</p>
              <h2 className="mb-6">What you receive</h2>
              <div className="space-y-6">
                <div className="card-minimal">
                  <h3 className="text-lg mb-2">PDF Report</h3>
                  <p className="text-muted-foreground">
                    Comprehensive document with executive summary, detailed findings, 
                    competitive matrix, and prioritized recommendations.
                  </p>
                </div>
                <div className="card-minimal">
                  <h3 className="text-lg mb-2">30-Minute Walkthrough</h3>
                  <p className="text-muted-foreground">
                    Video recording explaining key findings and recommendations. 
                    Live call available upon request.
                  </p>
                </div>
              </div>
            </div>
            <div>
              <p className="eyebrow mb-4">Guardrails</p>
              <h2 className="mb-6">What this is not</h2>
              <div className="space-y-4">
                {isNot.map((item, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 bg-secondary/50 rounded-lg">
                    <AlertCircle size={18} className="text-muted-foreground flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Purchase Flow Placeholder */}
      <section className="section-slide bg-secondary/30">
        <div className="container-wide">
          <div className="max-w-2xl mx-auto text-center">
            <p className="eyebrow mb-4">Get Started</p>
            <h2 className="mb-6">Purchase your audit</h2>
            <p className="lead mb-10">
              Complete payment, then fill out the intake form. We'll begin within 1 business day.
            </p>
            
            {/* Stripe Checkout */}
            <div className="card-minimal inline-block mb-8">
              {isPaymentLinkConfigured ? (
                <a href={stripeCheckoutUrl} target="_blank" rel="noopener noreferrer">
                  <Button variant="hero" size="lg" className="mb-4">
                    Pay €500 via Stripe
                    <ArrowRight size={18} />
                  </Button>
                </a>
              ) : (
                <Button
                  variant="hero"
                  size="lg"
                  className="mb-4"
                  onClick={handleApiCheckout}
                  disabled={isCheckoutLoading}
                >
                  {isCheckoutLoading ? "Starting checkout..." : "Pay €500 via Stripe"}
                  <ArrowRight size={18} />
                </Button>
              )}
              <p className="text-small text-muted-foreground">
                {isPaymentLinkConfigured
                  ? "You will be redirected to secure Stripe Checkout."
                  : "Secure Stripe Checkout will open in a new tab."}
              </p>
              {checkoutError && (
                <div className="mt-4">
                  <p className="text-small text-destructive">{checkoutError}</p>
                  <Link to="/contact" className="text-small text-foreground underline">
                    Contact us to purchase.
                  </Link>
                </div>
              )}
            </div>
            
            {/* Intake Form Placeholder */}
            <div className="card-minimal">
              <h3 className="mb-4">Intake Form</h3>
              <p className="text-muted-foreground mb-4">
                After payment, you'll receive access to a brief intake form covering:
              </p>
              <ul className="text-left space-y-2 max-w-sm mx-auto">
                <li className="flex items-center gap-2">
                  <Check size={16} /> Company overview
                </li>
                <li className="flex items-center gap-2">
                  <Check size={16} /> Target queries
                </li>
                <li className="flex items-center gap-2">
                  <Check size={16} /> Competitor names
                </li>
                <li className="flex items-center gap-2">
                  <Check size={16} /> Priority areas
                </li>
              </ul>
              <p className="text-small text-muted-foreground mt-4">[Form embed placeholder]</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-slide">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto">
            <p className="eyebrow mb-4 text-center">FAQ</p>
            <h2 className="mb-12 text-center">Common questions</h2>
            
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg px-6">
                  <AccordionTrigger className="text-left hover:no-underline py-4">
                    <span className="font-medium">{faq.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="pb-4 text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-slide bg-secondary/30">
        <div className="container-wide text-center">
          <h2 className="mb-6">Ready to see where you stand?</h2>
          <p className="lead max-w-xl mx-auto mb-10">
            €500. Fixed scope. Delivered in 5-7 business days.
          </p>
          {isPaymentLinkConfigured ? (
            <a href={stripeCheckoutUrl} target="_blank" rel="noopener noreferrer">
              <Button variant="hero" size="lg">
                Start your audit
                <ArrowRight size={18} />
              </Button>
            </a>
          ) : (
            <Button variant="hero" size="lg" onClick={handleApiCheckout} disabled={isCheckoutLoading}>
              {isCheckoutLoading ? "Starting checkout..." : "Start your audit"}
              <ArrowRight size={18} />
            </Button>
          )}
        </div>
      </section>
    </>
  );
}
