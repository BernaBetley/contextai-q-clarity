import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { ArticleSchema } from "../../components/StructuredData";
import { TrackedLink } from "../../components/TrackedLink";
import { buildMetadata } from "../../lib/metadata";

const resourceContent: Record<
  string,
  { title: string; category: string; sections: { heading: string; content: string }[] }
> = {
  "what-is-ai-share-of-voice": {
    title: "What is AI Share-of-Voice?",
    category: "Concepts",
    sections: [
      {
        heading: "Definition",
        content:
          "AI Share-of-Voice (AI SoV) measures how frequently a brand appears in AI-generated responses relative to competitors in a defined category. Unlike traditional share-of-voice metrics that measure advertising presence or media mentions, AI SoV specifically tracks visibility in LLM outputs.",
      },
      {
        heading: "How it differs from traditional Share-of-Voice",
        content:
          "Traditional SoV metrics focus on paid media presence, PR coverage, or social mentions. AI SoV measures something fundamentally different: how often AI systems cite, recommend, or include your brand when users ask category-relevant questions. A brand can have high traditional SoV but near-zero AI SoV if their content isn't structured for LLM consumption.",
      },
      {
        heading: "Why it matters",
        content:
          "AI assistants increasingly influence how buyers shortlist options. AI SoV helps you quantify whether you show up in those moments, whether you are correctly described, and whether competitors are being recommended instead.",
      },
      {
        heading: "How we measure it",
        content:
          "We sample a set of category-relevant questions across multiple LLMs (ChatGPT, Claude, Gemini, Perplexity), track brand appearances, score for prominence and accuracy, and calculate visibility percentages over time. The methodology is transparent and repeatable.",
      },
      {
        heading: "Limitations",
        content:
          "AI SoV is one metric among several. It doesn't capture response quality, sentiment, or conversion impact. It should be used alongside accuracy scoring, citation rates, and business outcome metrics.",
      },
    ],
  },
  "llm-seo-vs-seo-vs-geo": {
    title: "LLM SEO vs SEO vs GEO",
    category: "Strategy",
    sections: [
      {
        heading: "Traditional SEO",
        content:
          "Search Engine Optimization focuses on ranking in search engine results pages (SERPs). It involves keyword optimization, backlink building, technical site improvements, and content quality. Success is measured by rankings, organic traffic, and conversions from search.",
      },
      {
        heading: "GEO (Generative Engine Optimization)",
        content:
          "GEO is an emerging term for optimizing content to appear in AI-generated search results (like Google's AI Overviews or Bing's AI-powered responses). It bridges traditional SEO with AI-specific considerations, focusing on how search engines use AI to synthesize answers.",
      },
      {
        heading: "LLM SEO / AI Visibility Optimization",
        content:
          "This focuses specifically on visibility in standalone LLMs (ChatGPT, Claude, etc.) that don't crawl websites in real-time. It requires different tactics: structured data that persists in training data, authoritative sources that LLMs learn from, and citation-ready content formats.",
      },
      {
        heading: "Key differences",
        content:
          "Traditional SEO: Real-time crawling, link-based authority, SERP rankings. GEO: AI-enhanced search results, still tied to search engines. LLM SEO: Training data influence, no real-time updates, citation and accuracy focus. All three matter, but require different strategies.",
      },
      {
        heading: "Our approach",
        content:
          "We focus on LLM-specific visibility while ensuring compatibility with GEO and traditional SEO. The goal is omnichannel AI visibility—being accurately represented wherever AI surfaces information about your brand.",
      },
    ],
  },
};

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const resource = resourceContent[params.slug];
  if (!resource) return {};

  return buildMetadata({
    title: resource.title,
    description: resource.sections[0]?.content.slice(0, 160) ?? "",
    path: `/resources/${params.slug}`,
    type: "article",
  });
}

export default function ResourcePostPage({ params }: { params: { slug: string } }) {
  const resource = resourceContent[params.slug];
  if (!resource) notFound();

  return (
    <>
      <ArticleSchema
        headline={resource.title}
        description={resource.sections[0]?.content ?? ""}
        url={`/resources/${params.slug}`}
      />
      <section className="section-slide pt-24 md:pt-32">
        <div className="container-wide">
          <div className="max-w-3xl">
            <Link
              href="/resources"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8"
            >
              <ArrowLeft size={16} />
              Back to Resources
            </Link>

            <span className="badge-tag mb-4">{resource.category}</span>
            <h1>{resource.title}</h1>
          </div>
        </div>
      </section>

      <section className="section-slide">
        <div className="container-wide">
          <div className="max-w-3xl space-y-12">
            {resource.sections.map((section) => (
              <div key={section.heading}>
                <h2 className="text-2xl mb-4">{section.heading}</h2>
                <p className="text-muted-foreground leading-relaxed">{section.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-slide bg-secondary/30">
        <div className="container-wide text-center">
          <h2 className="mb-6">Put this into practice</h2>
          <p className="lead max-w-xl mx-auto mb-10">The €500 audit applies these concepts to your specific situation.</p>
          <TrackedLink
            href="/audit"
            className="btn btn-primary btn-lg"
            eventName="cta_click"
            eventParams={{ location: "resource_final", cta: "Start your audit" }}
          >
            Start your audit <ArrowRight size={18} />
          </TrackedLink>
        </div>
      </section>
    </>
  );
}

