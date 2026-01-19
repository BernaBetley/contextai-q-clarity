import type { Metadata } from "next";

import { buildMetadata } from "../lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Privacy",
  description: "Privacy policy for ContextAI Q.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <section className="section-slide pt-24 md:pt-32">
      <div className="container-wide">
        <div className="max-w-3xl">
          <p className="eyebrow mb-4">Legal</p>
          <h1 className="mb-6">Privacy Policy</h1>
          <p className="text-muted-foreground mb-10">
            This policy explains what we collect, why we collect it, and how you can request changes.
          </p>

          <div className="space-y-10">
            <div>
              <h2 className="text-2xl mb-3">What we collect</h2>
              <p className="text-muted-foreground">
                We collect information you provide when you contact us (e.g., name, email, company, message). If analytics is
                enabled, we may collect basic usage data (page views and interactions) to understand site performance.
              </p>
            </div>

            <div>
              <h2 className="text-2xl mb-3">How we use it</h2>
              <ul className="space-y-2 text-muted-foreground">
                <li>• To respond to inquiries and deliver services you request.</li>
                <li>• To operate, maintain, and improve the website and user experience.</li>
                <li>• To measure marketing performance (when analytics is enabled).</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl mb-3">Sharing</h2>
              <p className="text-muted-foreground">
                We do not sell personal data. We may share data with service providers necessary to operate the site (e.g.,
                analytics or form tooling) and only to the extent required. Contact form submissions are routed to our internal
                inbox or configured webhook processor.
              </p>
            </div>

            <div>
              <h2 className="text-2xl mb-3">Retention</h2>
              <p className="text-muted-foreground">
                We keep personal data only as long as needed to provide services, comply with legal obligations, or resolve
                disputes.
              </p>
            </div>

            <div>
              <h2 className="text-2xl mb-3">Your rights</h2>
              <p className="text-muted-foreground">
                You may request access, correction, or deletion of your information. Contact us at{" "}
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

