import type { Metadata } from "next";
import { ArrowRight, Calendar, Mail } from "lucide-react";

import { ContactForm } from "../components/ContactForm";
import { TrackedLink } from "../components/TrackedLink";
import { env } from "../lib/env.server";
import { buildMetadata } from "../lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Contact",
  description: "Start the AI Visibility Audit or schedule a call. We respond within one business day.",
  path: "/contact",
});

export default function ContactPage() {
  const calendlyUrl = env.NEXT_PUBLIC_CALENDLY_URL;

  return (
    <>
      {/* Hero */}
      <section className="section-slide pt-24 md:pt-32">
        <div className="container-wide">
          <p className="eyebrow mb-4">Contact</p>
          <h1 className="mb-6 max-w-3xl">Tell us about your category and we&apos;ll show you where you stand</h1>
          <p className="lead max-w-2xl">
            Share your category, target queries, and competitors. We respond within one business day with next steps.
          </p>
        </div>
      </section>

      <section className="section-slide">
        <div className="container-wide">
          <div className="grid-2-col">
            <div className="card-minimal">
              <h2 className="text-2xl mb-6">Send a request</h2>
              <ContactForm />
            </div>

            <div className="space-y-8">
              <div className="card-minimal">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                    <Calendar size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg mb-2">Schedule a call</h3>
                    <p className="text-muted-foreground mb-4">
                      Book a 20-minute call to confirm scope and outcomes.
                    </p>
                    {calendlyUrl ? (
                      <TrackedLink
                        href={calendlyUrl}
                        external
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-secondary btn-sm"
                        eventName="cta_click"
                        eventParams={{ location: "contact_schedule", cta: "Open calendar" }}
                      >
                        Open calendar <ArrowRight size={16} />
                      </TrackedLink>
                    ) : (
                      <TrackedLink
                        href="mailto:hello@contextaiq.com?subject=Call%20request%20(ContextAI%20Q)"
                        external
                        className="btn btn-secondary btn-sm"
                        eventName="cta_click"
                        eventParams={{ location: "contact_schedule", cta: "Request call by email" }}
                      >
                        Request a call by email <ArrowRight size={16} />
                      </TrackedLink>
                    )}
                  </div>
                </div>
              </div>

              <div className="card-minimal bg-secondary/50">
                <h3 className="text-lg mb-2">Ready to start?</h3>
                <p className="text-muted-foreground mb-4">Skip the call and purchase the €500 audit directly.</p>
                <TrackedLink
                  href="/audit"
                  className="btn btn-secondary btn-sm"
                  eventName="cta_click"
                  eventParams={{ location: "contact_cta", cta: "Start audit now" }}
                >
                  Start audit now <ArrowRight size={16} />
                </TrackedLink>
              </div>

              <div className="card-minimal">
                <h3 className="text-lg mb-2">Email us directly</h3>
                <p className="text-muted-foreground mb-4">
                  Prefer email? Send your context and we&apos;ll reply with next steps.
                </p>
                <TrackedLink
                  href="mailto:hello@contextaiq.com"
                  external
                  className="btn btn-secondary btn-sm"
                  eventName="cta_click"
                  eventParams={{ location: "contact_email", cta: "Email hello@contextaiq.com" }}
                >
                  Email hello@contextaiq.com <Mail size={16} />
                </TrackedLink>
                <p className="text-small mt-4">If you need invoicing details, include your billing entity and VAT ID.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-slide bg-secondary/30">
        <div className="container-wide text-center">
          <p className="eyebrow mb-4">Response time</p>
          <h2 className="mb-4">Within one business day</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            For urgent matters, indicate urgency in your email subject line.
          </p>
        </div>
      </section>
    </>
  );
}

