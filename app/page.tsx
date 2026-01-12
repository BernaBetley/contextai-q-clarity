export default function HomePage() {
  return (
    <>
      <section className="section-slide pt-24 md:pt-32">
        <div className="container-wide">
          <p className="eyebrow mb-4">AI Visibility Advisory</p>
          <h1 className="mb-6 max-w-3xl">
            A clearer signal for how AI tells your story.
          </h1>
          <p className="lead max-w-2xl mb-10">
            We help brands measure and shape their visibility in AI-generated answers,
            with a fixed-scope audit that turns ambiguity into action.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="/audit"
              className="inline-flex items-center justify-center rounded-md bg-foreground px-6 py-3 text-sm font-medium text-background shadow-subtle transition hover:-translate-y-0.5"
            >
              Run €500 Audit
            </a>
            <a
              href="/how-it-works"
              className="inline-flex items-center justify-center rounded-md border border-border px-6 py-3 text-sm font-medium text-foreground transition hover:-translate-y-0.5"
            >
              See methodology
            </a>
          </div>
        </div>
      </section>

      <section className="section-slide bg-secondary/30">
        <div className="container-wide">
          <div className="grid-3-col">
            {[
              {
                title: "Visibility baseline",
                description:
                  "Measure how often your brand appears in high-intent AI queries.",
              },
              {
                title: "Accuracy audit",
                description:
                  "Identify misinformation, outdated claims, and missing citations.",
              },
              {
                title: "Action roadmap",
                description:
                  "Receive a prioritized plan to improve visibility and trust.",
              },
            ].map((item) => (
              <div key={item.title} className="card-minimal">
                <h3 className="mb-3">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
