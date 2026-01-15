import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { SEO, WebPageSchema } from "@/components/layout/SEO";
import { useEffect } from "react";
import { track } from "@/lib/analytics";

// Mock signal content - in production, this would be loaded from MDX files
const signalContent: Record<string, {
  title: string;
  date: string;
  tags: string[];
  whatHappened: string[];
  whyItMatters: string[];
  whatToDoNext: string[];
}> = {
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
      "Content strategy must evolve from 'rank well' to 'be cited accurately.'",
      "The competitive landscape is resetting—incumbents have no guaranteed advantage.",
    ],
    whatToDoNext: [
      "Establish baseline AI Share-of-Voice metrics for your category.",
      "Audit content for citation-readiness and factual accuracy.",
      "Develop monitoring systems for AI-generated mentions.",
    ],
  },
};

export default function SignalPost() {
  const { slug } = useParams<{ slug: string }>();
  const signal = slug ? signalContent[slug] : null;

  useEffect(() => {
    if (slug) track("content_view", { type: "signal", slug });
  }, [slug]);

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

      {/* CTA */}
      <section className="section-slide">
        <div className="container-wide text-center">
          <h2 className="mb-6">Want to understand your position?</h2>
          <p className="lead max-w-xl mx-auto mb-10">
            The €500 audit shows exactly where you stand in AI-generated answers.
          </p>
          <Link to="/audit">
            <Button
              variant="hero"
              onClick={() => track("cta_click_audit", { placement: "signal_post" })}
            >
              Start your audit
              <ArrowRight size={18} />
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
}
