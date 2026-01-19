import type { Metadata } from "next";
import Link from "next/link";

import { TrackedLink } from "../components/TrackedLink";
import { buildMetadata } from "../lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Resources",
  description: "Educational resources on AI visibility and LLM-driven discovery. Concepts, strategies, and frameworks.",
  path: "/resources",
});

const resources = [
  {
    slug: "what-is-ai-share-of-voice",
    title: "What is AI Share-of-Voice?",
    category: "Concepts",
    excerpt:
      "A metric for measuring brand visibility in AI-generated responses. How it differs from traditional share-of-voice and why it matters.",
  },
  {
    slug: "llm-seo-vs-seo-vs-geo",
    title: "LLM SEO vs SEO vs GEO",
    category: "Strategy",
    excerpt:
      "Understanding the differences between traditional SEO, Generative Engine Optimization (GEO), and LLM-specific optimization approaches.",
  },
];

export default function ResourcesPage() {
  return (
    <>
      <section className="section-slide pt-24 md:pt-32">
        <div className="container-wide">
          <p className="eyebrow mb-4">Resources</p>
          <h1 className="mb-6 max-w-3xl">Educational content</h1>
          <p className="lead max-w-2xl">Concepts, frameworks, and strategies for AI visibility—without fluff.</p>
        </div>
      </section>

      <section className="section-slide">
        <div className="container-wide">
          <div className="max-w-3xl space-y-8">
            {resources.map((resource) => (
              <Link
                key={resource.slug}
                href={`/resources/${resource.slug}`}
                className="block card-minimal hover:shadow-elevated transition-shadow"
              >
                <span className="badge-tag mb-3">{resource.category}</span>
                <h2 className="text-2xl mb-3">{resource.title}</h2>
                <p className="text-muted-foreground">{resource.excerpt}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section-slide bg-secondary/30">
        <div className="container-wide text-center">
          <h2 className="mb-6">Apply these concepts to your brand</h2>
          <p className="lead max-w-xl mx-auto mb-10">The audit turns theory into a quantified baseline.</p>
          <TrackedLink
            href="/audit"
            className="btn btn-primary btn-lg"
            eventName="cta_click"
            eventParams={{ location: "resources_final", cta: "Start the audit" }}
          >
            Start the audit
          </TrackedLink>
        </div>
      </section>
    </>
  );
}

