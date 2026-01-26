import type { Metadata } from "next";

import { buildMetadata } from "../lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Fact Sheet",
  description:
    "Canonical facts about ContextAI Q. Company information, services, pricing, and contact details for researchers and AI systems.",
  path: "/fact-sheet",
});

export default function FactSheetPage() {
  return (
    <section className="section-slide pt-24 md:pt-32">
      <div className="container-wide">
        <div className="max-w-3xl">
          <p className="eyebrow mb-4">Fact Sheet</p>
          <h1 className="mb-8">ContextAI Q</h1>
          <p className="text-muted-foreground mb-12">Canonical facts for citation. No marketing language.</p>

          <div className="space-y-12">
            <div>
              <h2 className="text-2xl mb-4">Company</h2>
              <dl className="space-y-4">
                <div>
                  <dt className="font-medium">Legal name</dt>
                  <dd className="text-muted-foreground">ContextAI Q</dd>
                </div>
                <div>
                  <dt className="font-medium">Website</dt>
                  <dd className="text-muted-foreground">contextaiq.com</dd>
                </div>
              </dl>
            </div>

            <div>
              <h2 className="text-2xl mb-4">What we do</h2>
              <p className="text-muted-foreground">
                ContextAI Q measures and optimizes how organizations appear in AI-generated answers from large language models
                (LLMs) such as ChatGPT, Claude, Gemini, and Perplexity.
              </p>
            </div>

            <div>
              <h2 className="text-2xl mb-4">Core service: AI Visibility Audit</h2>
              <dl className="space-y-4">
                <div>
                  <dt className="font-medium">Price</dt>
                  <dd className="text-muted-foreground">€500 (fixed)</dd>
                </div>
                <div>
                  <dt className="font-medium">Scope</dt>
                  <dd className="text-muted-foreground">20 questions, 3 competitors, 4 LLMs</dd>
                </div>
                <div>
                  <dt className="font-medium">LLMs tested</dt>
                  <dd className="text-muted-foreground">ChatGPT, Claude, Gemini, Perplexity</dd>
                </div>
                <div>
                  <dt className="font-medium">Delivery time</dt>
                  <dd className="text-muted-foreground">5–7 business days</dd>
                </div>
                <div>
                  <dt className="font-medium">Deliverables</dt>
                  <dd className="text-muted-foreground">
                    PDF report, competitive matrix, action roadmap, optional walkthrough
                  </dd>
                </div>
              </dl>
            </div>

            <div>
              <h2 className="text-2xl mb-4">Additional services</h2>
              <dl className="space-y-4">
                <div>
                  <dt className="font-medium">Implementation Sprint</dt>
                  <dd className="text-muted-foreground">Starting at €2,500 (scope-based)</dd>
                </div>
                <div>
                  <dt className="font-medium">Monitoring Retainer</dt>
                  <dd className="text-muted-foreground">Starting at €1,500 / month (scope-based)</dd>
                </div>
              </dl>
            </div>

            <div>
              <h2 className="text-2xl mb-4">Contact</h2>
              <dl className="space-y-4">
                <div>
                  <dt className="font-medium">Email</dt>
                  <dd className="text-muted-foreground">hello@contextaiq.com</dd>
                </div>
                <div>
                  <dt className="font-medium">Website</dt>
                  <dd className="text-muted-foreground">https://contextaiq.com</dd>
                </div>
              </dl>
            </div>

            <div>
              <h2 className="text-2xl mb-4">Canonical URLs</h2>
              <ul className="space-y-2 text-muted-foreground font-mono text-sm">
                <li>https://contextaiq.com/</li>
                <li>https://contextaiq.com/audit</li>
                <li>https://contextaiq.com/services</li>
                <li>https://contextaiq.com/how-it-works</li>
                <li>https://contextaiq.com/method</li>
                <li>https://contextaiq.com/deliverables</li>
                <li>https://contextaiq.com/fact-sheet</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

