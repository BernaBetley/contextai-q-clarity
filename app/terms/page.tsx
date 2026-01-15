import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms",
  description: "Terms of service for ContextAI Q.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <section className="section-slide pt-24 md:pt-32">
      <div className="container-wide">
        <div className="max-w-3xl">
          <p className="eyebrow mb-4">Legal</p>
          <h1 className="mb-6">Terms of Service</h1>
          <p className="text-muted-foreground mb-10">
            These terms govern your use of this website and the services we provide.
          </p>

          <div className="space-y-10">
            <div>
              <h2 className="text-2xl mb-3">Website use</h2>
              <p className="text-muted-foreground">
                You may use this website for lawful purposes only. You agree not to misuse or attempt to disrupt the site.
              </p>
            </div>

            <div>
              <h2 className="text-2xl mb-3">Services</h2>
              <p className="text-muted-foreground">
                Service details, timelines, and deliverables are defined on the relevant service pages and/or in written
                agreements. If there is a conflict, the written agreement governs.
              </p>
            </div>

            <div>
              <h2 className="text-2xl mb-3">Payments</h2>
              <p className="text-muted-foreground">
                When purchasing the AI Visibility Audit, payment is processed by our payment provider. If you need an invoice
                or alternative payment method, contact{" "}
                <a className="text-foreground underline underline-offset-4" href="mailto:hello@contextaiq.com">
                  hello@contextaiq.com
                </a>
                .
              </p>
            </div>

            <div>
              <h2 className="text-2xl mb-3">Disclaimer</h2>
              <p className="text-muted-foreground">
                Information on this site is provided “as is”. AI system behavior changes over time; results may vary by model,
                prompt, geography, and product updates.
              </p>
            </div>

            <div>
              <h2 className="text-2xl mb-3">Limitation of liability</h2>
              <p className="text-muted-foreground">
                To the maximum extent permitted by law, ContextAI Q will not be liable for indirect, incidental, or
                consequential damages arising from the use of this site.
              </p>
            </div>

            <div>
              <h2 className="text-2xl mb-3">Contact</h2>
              <p className="text-muted-foreground">
                Questions about these terms:{" "}
                <a className="text-foreground underline underline-offset-4" href="mailto:hello@contextaiq.com">
                  hello@contextaiq.com
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

