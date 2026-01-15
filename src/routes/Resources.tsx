import { Link } from "react-router-dom";
import { SEO, WebPageSchema } from "@/components/layout/SEO";
import { track } from "@/lib/analytics";
import { useEffect } from "react";

// Mock data for resources
const resources = [
  {
    slug: "what-is-ai-share-of-voice",
    title: "What is AI Share-of-Voice?",
    category: "Concepts",
    excerpt: "A new metric for measuring brand visibility in AI-generated responses. How it differs from traditional share-of-voice and why it matters.",
  },
  {
    slug: "llm-seo-vs-seo-vs-geo",
    title: "LLM SEO vs SEO vs GEO",
    category: "Strategy",
    excerpt: "Understanding the differences between traditional SEO, Generative Engine Optimization (GEO), and LLM-specific optimization approaches.",
  },
];

export default function Resources() {
  useEffect(() => {
    track("content_list_view", { type: "resources" });
  }, []);

  return (
    <>
      <SEO
        title="Resources"
        description="Educational resources on AI visibility, LLM optimization, and AI-driven discovery. Concepts, strategies, and frameworks."
        canonical="/resources"
      />
      <WebPageSchema
        title="Resources"
        description="Educational resources from ContextAI Q."
        url="/resources"
      />

      {/* Hero */}
      <section className="section-slide pt-24 md:pt-32">
        <div className="container-wide">
          <p className="eyebrow mb-4">Resources</p>
          <h1 className="mb-6 max-w-3xl">Educational content</h1>
          <p className="lead max-w-2xl">
            Concepts, frameworks, and strategies for AI visibility. 
            No fluff, no fabricated statistics.
          </p>
        </div>
      </section>

      {/* Resource List */}
      <section className="section-slide">
        <div className="container-wide">
          <div className="max-w-3xl space-y-8">
            {resources.map((resource, index) => (
              <Link
                key={index}
                to={`/resources/${resource.slug}`}
                className="block card-minimal hover:shadow-elevated transition-shadow"
                onClick={() => track("content_click", { type: "resource", slug: resource.slug })}
              >
                <span className="badge-tag mb-3">{resource.category}</span>
                <h2 className="text-2xl mb-3">{resource.title}</h2>
                <p className="text-muted-foreground">{resource.excerpt}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
