import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Calendar, Mail, Clock, MessageSquare } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact ContextAI Q — Get in Touch",
  description:
    "Contact ContextAI Q about AI visibility audits, implementation, or custom projects. We respond within one business day. Book a call or send an email.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL;

  return (
    <>
      {/* Hero */}
      <section className="section-slide pt-24 md:pt-32">
        <div className="container-wide">
          <p className="eyebrow mb-4">Contact</p>
          <h1 className="mb-6 max-w-3xl">Let&apos;s talk</h1>
          <p className="lead max-w-2xl">
            Questions about AI visibility? Ready to start an audit? We respond within one business day.
          </p>
        </div>
      </section>

      {/* Contact Options */}
      <section className="section-slide">
        <div className="container-wide">
          <div className="grid-2-col">
            {/* Email Card */}
            <div className="card-minimal">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                  <Mail size={24} />
                </div>
                <div>
                  <h2 className="text-2xl mb-2">Email us</h2>
                  <p className="text-muted-foreground">Best for detailed inquiries</p>
                </div>
              </div>
              
              <p className="text-muted-foreground mb-6">
                Include context about your company, category, and what you&apos;re hoping to achieve. 
                The more detail you provide, the more useful our response.
              </p>

              <a
                href="mailto:hello@contextaiq.com"
                className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-sm transition-all duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                Email hello@contextaiq.com <Mail size={16} />
              </a>

              <div className="mt-6 p-4 bg-secondary/50 rounded-lg">
                <p className="text-sm font-medium mb-2">What to include:</p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Company name and website</li>
                  <li>• Your category/industry</li>
                  <li>• Key competitors (if known)</li>
                  <li>• What prompted your interest in AI visibility</li>
                </ul>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Schedule Call Card */}
              <div className="card-minimal">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                    <Calendar size={24} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg mb-2">Schedule a call</h3>
                    <p className="text-muted-foreground mb-4">
                      30-minute introductory call to discuss your AI visibility needs and determine fit.
                    </p>
                    {calendlyUrl ? (
                      <a
                        href={calendlyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 rounded-md border border-foreground bg-transparent px-5 py-2 text-sm font-medium text-foreground transition-all duration-200 hover:bg-foreground hover:text-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      >
                        Open calendar <ArrowRight size={16} />
                      </a>
                    ) : (
                      <a
                        href="mailto:hello@contextaiq.com?subject=Call%20request%20—%20AI%20Visibility"
                        className="inline-flex items-center justify-center gap-2 rounded-md border border-foreground bg-transparent px-5 py-2 text-sm font-medium text-foreground transition-all duration-200 hover:bg-foreground hover:text-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      >
                        Request a call <ArrowRight size={16} />
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* Skip to Audit Card */}
              <div className="card-minimal bg-secondary/50">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-background flex items-center justify-center flex-shrink-0 shadow-subtle">
                    <MessageSquare size={24} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg mb-2">Ready to start?</h3>
                    <p className="text-muted-foreground mb-4">
                      Skip the call and purchase the €500 audit directly. Results in 5-7 business days.
                    </p>
                    <Link
                      href="/audit"
                      className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-5 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-all duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    >
                      Start audit now <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Response Time */}
              <div className="flex items-center gap-3 p-4 border border-border rounded-lg">
                <Clock size={20} className="text-muted-foreground" />
                <div>
                  <p className="font-medium">Response time: within 1 business day</p>
                  <p className="text-sm text-muted-foreground">For urgent matters, indicate in subject line</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Invoice/Billing Info */}
      <section className="section-slide bg-secondary/30">
        <div className="container-wide">
          <div className="max-w-2xl mx-auto text-center">
            <p className="eyebrow mb-4">Billing</p>
            <h2 className="mb-6">Need an invoice or bank transfer?</h2>
            <p className="text-muted-foreground mb-6">
              If you need to pay by bank transfer or require a specific invoicing format, 
              email us with your billing entity name and VAT ID (if applicable). 
              We&apos;ll send a proforma invoice with payment details.
            </p>
            <a
              href="mailto:hello@contextaiq.com?subject=Invoice%20request%20—%20AI%20Visibility%20Audit"
              className="inline-flex items-center justify-center gap-2 rounded-md border border-foreground bg-transparent px-5 py-2 text-sm font-medium text-foreground transition-all duration-200 hover:bg-foreground hover:text-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              Request invoice <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section-slide">
        <div className="container-wide text-center">
          <p className="text-muted-foreground mb-4">Not sure what you need?</p>
          <h2 className="mb-6">Start with a quick question</h2>
          <p className="lead max-w-xl mx-auto mb-10">
            Even a one-line email helps. We&apos;ll point you in the right direction—no sales pressure.
          </p>
          <a
            href="mailto:hello@contextaiq.com?subject=Quick%20question%20about%20AI%20visibility"
            className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-8 py-4 text-base font-medium text-primary-foreground shadow-elevated transition-all duration-200 hover:shadow-prominent hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            Send a quick question <Mail size={18} />
          </a>
        </div>
      </section>
    </>
  );
}
