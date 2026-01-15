import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Calendar, Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with ContextAI Q. Schedule a call, send an email, or start the AI Visibility Audit.",
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
          <p className="lead max-w-2xl">Questions about AI visibility? We respond within one business day.</p>
        </div>
      </section>

      <section className="section-slide">
        <div className="container-wide">
          <div className="grid-2-col">
            <div className="card-minimal">
              <h2 className="text-2xl mb-6">Email</h2>
              <p className="text-muted-foreground mb-6">
                Send context (company, category, competitors, priority queries) and we&apos;ll reply with next steps.
              </p>
              <a
                href="mailto:hello@contextaiq.com"
                className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground shadow-subtle transition hover:-translate-y-0.5"
              >
                Email hello@contextaiq.com <Mail size={16} />
              </a>
              <p className="text-small mt-4">If you need invoicing details, include your billing entity and VAT ID.</p>
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
                      Book a 30-minute introductory call to discuss your AI visibility needs.
                    </p>
                    {calendlyUrl ? (
                      <a
                        href={calendlyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 rounded-md border border-foreground bg-transparent px-5 py-2 text-sm font-medium text-foreground transition-all duration-200 hover:bg-foreground hover:text-background"
                      >
                        Open calendar <ArrowRight size={16} />
                      </a>
                    ) : (
                      <a
                        href="mailto:hello@contextaiq.com?subject=Call%20request%20(ContextAI%20Q)"
                        className="inline-flex items-center justify-center gap-2 rounded-md border border-foreground bg-transparent px-5 py-2 text-sm font-medium text-foreground transition-all duration-200 hover:bg-foreground hover:text-background"
                      >
                        Request a call by email <ArrowRight size={16} />
                      </a>
                    )}
                  </div>
                </div>
              </div>

              <div className="card-minimal bg-secondary/50">
                <h3 className="text-lg mb-2">Ready to start?</h3>
                <p className="text-muted-foreground mb-4">Skip the call and purchase the €500 audit directly.</p>
                <Link
                  href="/audit"
                  className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground shadow-subtle transition hover:-translate-y-0.5"
                >
                  Start audit now <ArrowRight size={16} />
                </Link>
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

