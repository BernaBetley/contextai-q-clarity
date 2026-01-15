import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Signals",
  description: "Industry signals and developments in AI visibility and AI-driven discovery. What changed, why it matters, and what to do next.",
  alternates: { canonical: "/signals" },
};

const signals = [
  {
    slug: "seo-to-ai-share-of-voice",
    title: "From SEO to AI Share-of-Voice: the new discovery funnel",
    date: "2024-01-10",
    tags: ["Strategy", "AI Discovery", "SEO"],
    excerpt:
      "Traditional SEO metrics are becoming less predictive as AI intermediates the discovery process. Here’s how the funnel is changing and what to measure instead.",
  },
];

export default function SignalsPage() {
  return (
    <>
      <section className="section-slide pt-24 md:pt-32">
        <div className="container-wide">
          <p className="eyebrow mb-4">Signals</p>
          <h1 className="mb-6 max-w-3xl">Industry developments</h1>
          <p className="lead max-w-2xl">What happened, why it matters, and what to do next—without fluff.</p>
        </div>
      </section>

      <section className="section-slide">
        <div className="container-wide">
          <div className="max-w-3xl space-y-8">
            {signals.map((signal) => (
              <Link
                key={signal.slug}
                href={`/signals/${signal.slug}`}
                className="block card-minimal hover:shadow-elevated transition-shadow"
              >
                <div className="flex flex-wrap gap-2 mb-3">
                  {signal.tags.map((tag) => (
                    <span key={tag} className="badge-tag">
                      {tag}
                    </span>
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

