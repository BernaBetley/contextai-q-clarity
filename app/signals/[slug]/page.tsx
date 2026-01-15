import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { ArticleSchema } from "../../components/StructuredData";
import { TrackedLink } from "../../components/TrackedLink";
import { buildMetadata } from "../../lib/metadata";

const signalContent: Record<
  string,
  {
    title: string;
    date: string;
    tags: string[];
    whatHappened: string[];
    whyItMatters: string[];
    whatToDoNext: string[];
  }
> = {
  "seo-to-ai-share-of-voice": {
    title: "From SEO to AI Share-of-Voice: the new discovery funnel",
    date: "2024-01-10",
    tags: ["Strategy", "AI Discovery", "SEO"],
    whatHappened: [
      "Buyers increasingly ask AI assistants for category and vendor recommendations.",
      "In many journeys, the “shortlist” now forms inside AI-generated answers, not on search result pages.",
      "That shifts the optimization target from “rank” to “be mentioned and cited accurately.”",
    ],
    whyItMatters: [
      "Traditional SEO rankings may become less predictive of traffic and conversions.",
      "Brands need new measurement frameworks for AI visibility.",
      "Content strategy must evolve from “rank well” to “be cited accurately.”",
      "The competitive landscape is resetting—incumbents have no guaranteed advantage.",
    ],
    whatToDoNext: [
      "Establish baseline AI Share-of-Voice metrics for your category.",
      "Audit content for citation-readiness and factual accuracy.",
      "Develop monitoring systems for AI-generated mentions.",
    ],
  },
};

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const signal = signalContent[params.slug];
  if (!signal) return {};

  return buildMetadata({
    title: signal.title,
    description: `Analysis: ${signal.whatHappened[0]}`,
    path: `/signals/${params.slug}`,
    type: "article",
  });
}

export default function SignalPostPage({ params }: { params: { slug: string } }) {
  const signal = signalContent[params.slug];
  if (!signal) notFound();

  return (
    <>
      <ArticleSchema
        headline={signal.title}
        description={signal.whatHappened[0]}
        url={`/signals/${params.slug}`}
        datePublished={signal.date}
      />
      <section className="section-slide pt-24 md:pt-32">
        <div className="container-wide">
          <div className="max-w-3xl">
            <Link href="/signals" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8">
              <ArrowLeft size={16} />
              Back to Signals
            </Link>

            <div className="flex flex-wrap gap-2 mb-4">
              {signal.tags.map((tag) => (
                <span key={tag} className="badge-tag">
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="mb-4">{signal.title}</h1>
            <p className="text-muted-foreground">{signal.date}</p>
          </div>
        </div>
      </section>

      <section className="section-slide">
        <div className="container-wide">
          <div className="max-w-3xl">
            <h2 className="mb-6">What happened</h2>
            <ul className="space-y-4">
              {signal.whatHappened.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="text-muted-foreground">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section-slide bg-secondary/30">
        <div className="container-wide">
          <div className="max-w-3xl">
            <h2 className="mb-6">Why it matters for AI discoverability</h2>
            <ul className="space-y-4">
              {signal.whyItMatters.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="text-muted-foreground">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section-slide">
        <div className="container-wide">
          <div className="max-w-3xl">
            <h2 className="mb-6">What to do next</h2>
            <div className="space-y-4">
              {signal.whatToDoNext.map((item, index) => (
                <div key={item} className="flex items-start gap-4 p-4 bg-secondary/50 rounded-lg">
                  <span className="text-2xl font-serif font-semibold text-muted-foreground">
                    {(index + 1).toString().padStart(2, "0")}
                  </span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-slide">
        <div className="container-wide text-center">
          <h2 className="mb-6">Want to understand your position?</h2>
          <p className="lead max-w-xl mx-auto mb-10">The €500 audit shows exactly where you stand in AI-generated answers.</p>
          <TrackedLink
            href="/audit"
            className="btn btn-primary btn-lg"
            eventName="cta_click"
            eventParams={{ location: "signal_final", cta: "Start your audit" }}
          >
            Start your audit <ArrowRight size={18} />
          </TrackedLink>
        </div>
      </section>
    </>
  );
}

