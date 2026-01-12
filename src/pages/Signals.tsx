import { Link } from "react-router-dom";
import { SEO, WebPageSchema } from "@/components/layout/SEO";

// Mock data for signals - in production, this would come from markdown files
const signals = [
  {
    slug: "walmart-google-ai-commerce",
    title: "Walmart × Google: AI Commerce Goes Native",
    date: "2024-01-15",
    tags: ["AI Commerce", "Google", "Retail"],
    excerpt: "Google's integration of Walmart inventory into AI-powered shopping experiences signals a major shift in how consumers will discover and purchase products.",
  },
  {
    slug: "seo-to-ai-share-of-voice",
    title: "From SEO to AI Share-of-Voice: the new discovery funnel",
    date: "2024-01-10",
    tags: ["Strategy", "AI Discovery", "SEO"],
    excerpt: "Traditional SEO metrics are becoming less relevant as AI intermediates the discovery process. Here's how the funnel is changing.",
  },
];

export default function Signals() {
  return (
    <>
      <SEO
        title="Signals"
        description="Industry signals and developments in AI visibility, LLM optimization, and AI-driven discovery. Analysis and implications for brands."
        canonical="/signals"
      />
      <WebPageSchema
        title="Signals"
        description="Industry signals and analysis from ContextAI Q."
        url="/signals"
      />

      {/* Hero */}
      <section className="section-slide pt-24 md:pt-32">
        <div className="container-wide">
          <p className="eyebrow mb-4">Signals</p>
          <h1 className="mb-6 max-w-3xl">Industry developments</h1>
          <p className="lead max-w-2xl">
            Key signals from the AI visibility landscape. What happened, why it matters, 
            and what to do about it.
          </p>
        </div>
      </section>

      {/* Signal List */}
      <section className="section-slide">
        <div className="container-wide">
          <div className="max-w-3xl space-y-8">
            {signals.map((signal, index) => (
              <Link
                key={index}
                to={`/signals/${signal.slug}`}
                className="block card-minimal hover:shadow-elevated transition-shadow"
              >
                <div className="flex flex-wrap gap-2 mb-3">
                  {signal.tags.map((tag, i) => (
                    <span key={i} className="badge-tag">{tag}</span>
                  ))}
                </div>
                <h2 className="text-2xl mb-3">{signal.title}</h2>
                <p className="text-muted-foreground mb-4">{signal.excerpt}</p>
                <p className="text-small">{signal.date}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
