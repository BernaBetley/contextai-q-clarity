import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Audit — Success",
  description: "Payment received. Next steps for your ContextAI Q AI Visibility Audit.",
  alternates: { canonical: "/audit/success" },
};

export default function AuditSuccessPage() {
  const intakeUrl = process.env.NEXT_PUBLIC_AUDIT_INTAKE_URL;

  return (
    <section className="section-slide pt-24 md:pt-32">
      <div className="container-wide">
        <div className="max-w-2xl">
          <p className="eyebrow mb-4">Payment received</p>
          <h1 className="mb-6">Next step: intake</h1>
          <p className="lead mb-10">
            Complete the intake so we can lock the 20 queries, competitors, and priority areas. We begin within 1 business day.
          </p>

          {intakeUrl ? (
            <a
              href={intakeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-8 py-6 text-base font-medium text-primary-foreground shadow-elevated transition-all duration-200 hover:shadow-prominent hover:-translate-y-0.5 active:translate-y-0"
            >
              Open intake form <ArrowRight size={18} />
            </a>
          ) : (
            <p className="text-muted-foreground">
              Intake link is provided in your confirmation email. If you don’t receive it, email{" "}
              <a className="text-foreground underline underline-offset-4" href="mailto:hello@contextaiq.com">
                hello@contextaiq.com
              </a>
              .
            </p>
          )}

          <div className="mt-10">
            <Link href="/audit" className="text-small hover:text-foreground transition-colors">
              Back to audit page
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

