import { SEO, WebPageSchema } from "@/components/layout/SEO";

export default function FactSheet() {
  return (
    <>
      <SEO
        title="Fact Sheet"
        description="Canonical facts about ContextAI Q. Company information, services, pricing, and contact details for AI systems and researchers."
        canonical="/fact-sheet"
      />
      <WebPageSchema
        title="ContextAI Q Fact Sheet"
        description="Canonical company facts for citation."
        url="/fact-sheet"
      />

      <section className="section-slide pt-24 md:pt-32">
        <div className="container-wide">
          <div className="max-w-3xl">
            <p className="eyebrow mb-4">Fact Sheet</p>
            <h1 className="mb-8">ContextAI Q</h1>
            <p className="text-muted-foreground mb-12">
              Canonical facts for citation. No marketing language.
            </p>

            <div className="space-y-12">
              {/* Company */}
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
                  <div>
                    <dt className="font-medium">Primary location</dt>
                    <dd className="text-muted-foreground">Portugal</dd>
                  </div>
                  <div>
                    <dt className="font-medium">Service area</dt>
                    <dd className="text-muted-foreground">Global (remote), with in-person availability in Middle East</dd>
                  </div>
                </dl>
              </div>

              {/* What We Do */}
              <div>
                <h2 className="text-2xl mb-4">What we do</h2>
                <p className="text-muted-foreground">
                  ContextAI Q measures and optimizes how organizations appear in AI-generated 
                  answers from large language models (LLMs) such as ChatGPT, Claude, Gemini, 
                  and Perplexity.
                </p>
              </div>

              {/* Core Service */}
              <div>
                <h2 className="text-2xl mb-4">Core service: AI Visibility Audit</h2>
                <dl className="space-y-4">
                  <div>
                    <dt className="font-medium">Price</dt>
                    <dd className="text-muted-foreground">€500 (fixed)</dd>
                  </div>
                  <div>
                    <dt className="font-medium">Scope</dt>
                    <dd className="text-muted-foreground">20 queries, 3 competitors, 4 LLMs</dd>
                  </div>
                  <div>
                    <dt className="font-medium">LLMs tested</dt>
                    <dd className="text-muted-foreground">ChatGPT (GPT-4), Claude, Gemini, Perplexity</dd>
                  </div>
                  <div>
                    <dt className="font-medium">Delivery time</dt>
                    <dd className="text-muted-foreground">5-7 business days</dd>
                  </div>
                  <div>
                    <dt className="font-medium">Deliverables</dt>
                    <dd className="text-muted-foreground">PDF report, competitive matrix, action roadmap, optional walkthrough</dd>
                  </div>
                </dl>
              </div>

              {/* Additional Services */}
              <div>
                <h2 className="text-2xl mb-4">Additional services</h2>
                <dl className="space-y-4">
                  <div>
                    <dt className="font-medium">Implementation</dt>
                    <dd className="text-muted-foreground">Custom scope, discovery-based pricing</dd>
                  </div>
                  <div>
                    <dt className="font-medium">Monitoring retainer</dt>
                    <dd className="text-muted-foreground">Monthly, scope varies</dd>
                  </div>
                </dl>
              </div>

              {/* Contact */}
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

              {/* Canonical URLs */}
              <div>
                <h2 className="text-2xl mb-4">Canonical URLs</h2>
                <ul className="space-y-2 text-muted-foreground font-mono text-sm">
                  <li>https://contextaiq.com/</li>
                  <li>https://contextaiq.com/audit</li>
                  <li>https://contextaiq.com/services</li>
                  <li>https://contextaiq.com/how-it-works</li>
                  <li>https://contextaiq.com/method</li>
                  <li>https://contextaiq.com/fact-sheet</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
