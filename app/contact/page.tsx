import type { Metadata } from "next";
import { ArrowRight, Mail } from "lucide-react";

import { ContactForm } from "../components/ContactForm";
import { TrackedLink } from "../components/TrackedLink";
import { buildMetadata } from "../lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Contact",
  description: "Start the AI Visibility Audit or get in touch. We respond within one business day.",
  path: "/contact",
});

export default function ContactPage() {
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

            <div className="space-y-6">
              <div className="card-minimal bg-secondary/50">
                <h3 className="text-lg mb-2">Ready to start?</h3>
                <p className="text-muted-foreground mb-4">Skip the form and purchase the €500 audit directly.</p>
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

