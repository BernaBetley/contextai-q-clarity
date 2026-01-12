import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { SEO, WebPageSchema } from "@/components/layout/SEO";

// Mock signal content - in production, this would be loaded from MDX files
const signalContent: Record<string, {
  title: string;
  date: string;
  tags: string[];
  whatHappened: string[];
  whyItMatters: string[];
  whatToDoNext: string[];
  sources: { title: string; url: string }[];
}> = {
  "walmart-google-ai-commerce": {
    title: "Walmart × Google: AI Commerce Goes Native",
    date: "2024-01-15",
    tags: ["AI Commerce", "Google", "Retail"],
    whatHappened: [
      "Google announced deeper integration with Walmart for AI-powered shopping experiences.",
      "Product inventory and availability will be surfaced directly in Google's AI-generated responses.",
      "Voice shopping through Google Assistant will include Walmart product recommendations.",
      "[Additional details from official announcement - source placeholder]",
    ],
    whyItMatters: [
      "AI intermediation of retail discovery is accelerating faster than expected.",
      "Brands not visible in these AI-powered experiences will lose market share to those that are.",
      "Traditional e-commerce SEO tactics may be insufficient for AI commerce visibility.",
      "First-mover advantage in AI commerce optimization could be significant.",
    ],
    whatToDoNext: [
      "Audit your current visibility in Google's AI shopping experiences.",
      "Ensure product data is structured and citation-ready for AI consumption.",
      "Monitor competitor visibility in AI-powered shopping interfaces.",
    ],
    sources: [
      { title: "[Google Official Announcement - placeholder]", url: "#" },
      { title: "[Walmart Press Release - placeholder]", url: "#" },
      { title: "[Industry Analysis - placeholder]", url: "#" },
    ],
  },
  "seo-to-ai-share-of-voice": {
    title: "From SEO to AI Share-of-Voice: the new discovery funnel",
    date: "2024-01-10",
    tags: ["Strategy", "AI Discovery", "SEO"],
    whatHappened: [
      "Major search engines are shifting from link-based results to AI-generated answers.",
      "User behavior is changing: direct answers reduce click-through to source websites.",
      "New metrics are emerging to measure visibility in AI-generated responses.",
      "[Additional market data - source placeholder]",
    ],
    whyItMatters: [
      "Traditional SEO rankings may become less predictive of traffic and conversions.",
      "Brands need new measurement frameworks for AI visibility.",
      "Content strategy must evolve from 'rank well' to 'be cited accurately.'",
      "The competitive landscape is resetting—incumbents have no guaranteed advantage.",
    ],
    whatToDoNext: [
      "Establish baseline AI Share-of-Voice metrics for your category.",
      "Audit content for citation-readiness and factual accuracy.",
      "Develop monitoring systems for AI-generated mentions.",
    ],
    sources: [
      { title: "[Industry Research Report - placeholder]", url: "#" },
      { title: "[Search Engine Announcement - placeholder]", url: "#" },
    ],
  },
};

export default function SignalPost() {
  const { slug } = useParams<{ slug: string }>();
  const signal = slug ? signalContent[slug] : null;

  if (!signal) {
    return (
      <div className="section-slide pt-24 md:pt-32 text-center">
        <div className="container-wide">
          <h1 className="mb-6">Signal not found</h1>
          <Link to="/signals">
            <Button variant="outline">
              <ArrowLeft size={16} />
              Back to Signals
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEO
        title={signal.title}
        description={`Analysis: ${signal.whatHappened[0]}`}
        canonical={`/signals/${slug}`}
        type="article"
        publishedTime={signal.date}
      />
      <WebPageSchema
        title={signal.title}
        description={signal.whatHappened[0]}
        url={`/signals/${slug}`}
      />

      {/* Header */}
      <section className="section-slide pt-24 md:pt-32">
        <div className="container-wide">
          <div className="max-w-3xl">
            <Link 
              to="/signals" 
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8"
            >
              <ArrowLeft size={16} />
              Back to Signals
            </Link>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {signal.tags.map((tag, i) => (
                <span key={i} className="badge-tag">{tag}</span>
              ))}
            </div>
            
            <h1 className="mb-4">{signal.title}</h1>
            <p className="text-muted-foreground">{signal.date}</p>
          </div>
        </div>
      </section>

      {/* What Happened */}
      <section className="section-slide">
        <div className="container-wide">
          <div className="max-w-3xl">
            <h2 className="mb-6">What happened</h2>
            <ul className="space-y-4">
              {signal.whatHappened.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="text-muted-foreground">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Why It Matters */}
      <section className="section-slide bg-secondary/30">
        <div className="container-wide">
          <div className="max-w-3xl">
            <h2 className="mb-6">Why it matters for AI discoverability</h2>
            <ul className="space-y-4">
              {signal.whyItMatters.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="text-muted-foreground">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* What To Do Next */}
      <section className="section-slide">
        <div className="container-wide">
          <div className="max-w-3xl">
            <h2 className="mb-6">What to do next</h2>
            <div className="space-y-4">
              {signal.whatToDoNext.map((item, index) => (
                <div key={index} className="flex items-start gap-4 p-4 bg-secondary/50 rounded-lg">
                  <span className="text-2xl font-serif font-semibold text-muted-foreground">
                    {(index + 1).toString().padStart(2, '0')}
                  </span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Sources */}
      <section className="section-slide bg-secondary/30">
        <div className="container-wide">
          <div className="max-w-3xl">
            <h2 className="mb-6">Sources</h2>
            <ul className="space-y-3">
              {signal.sources.map((source, index) => (
                <li key={index}>
                  <a 
                    href={source.url} 
                    className="text-foreground hover:text-muted-foreground transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {source.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-slide">
        <div className="container-wide text-center">
          <h2 className="mb-6">Want to understand your position?</h2>
          <p className="lead max-w-xl mx-auto mb-10">
            The €500 audit shows exactly where you stand in AI-generated answers.
          </p>
          <Link to="/audit">
            <Button variant="hero">
              Start your audit
              <ArrowRight size={18} />
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
}
