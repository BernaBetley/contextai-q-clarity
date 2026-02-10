import type { Metadata } from "next";
import {
  Activity,
  ArrowRight,
  BarChart3,
  CheckCircle2,
  FileText,
  Search,
  ShieldCheck,
  Target,
} from "lucide-react";

import { FaqSchema, ServiceSchema } from "./components/StructuredData";
import { TrackedLink } from "./components/TrackedLink";
import { buildMetadata } from "./lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "AI Visibility Audit",
  description:
    "A fixed-scope audit that measures how your brand appears in AI-generated answers across major LLMs and delivers a prioritized action roadmap in 5–7 business days.",
  path: "/",
});

function Section({
  children,
  className = "",
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={`section-slide ${className}`}>
      <div className="container-wide">{children}</div>
    </section>
  );
}

const phases = [
  {
    title: "Scope & query selection",
    description: "Define 20 strategic queries across brand, category, and use-case intent.",
    output: "Validated query set and success criteria.",
    icon: Search,
  },
  {
    title: "Multi-LLM testing",
    description: "Run queries across ChatGPT, Claude, Gemini, and Perplexity.",
    output: "Response archive with screenshots and metadata.",
    icon: Activity,
  },
  {
    title: "Visibility + accuracy scoring",
    description: "Score appearance, prominence, and factual accuracy on a 0–100 scale.",
    output: "Visibility scorecard and error inventory.",
    icon: BarChart3,
  },
  {
    title: "Root-cause analysis",
    description: "Identify source gaps, citation patterns, and content structure issues.",
    output: "Cause map and fixability assessment.",
    icon: ShieldCheck,
  },
  {
    title: "Roadmap + delivery",
    description: "Prioritize actions by impact and effort for immediate execution.",
    output: "Executive summary, roadmap, and walkthrough.",
    icon: Target,
  },
];

const deliverables = [
  {
    title: "Visibility scorecard",
    description: "Query-level scores by model with clear baselines.",
  },
  {
    title: "Evidence snapshots",
    description: "Screenshots and citations showing how LLMs describe you today.",
  },
  {
    title: "Competitive matrix",
    description: "Head-to-head comparison with 3 named competitors.",
  },
  {
    title: "Prioritized roadmap",
    description: "Sequenced actions grouped by quick wins vs. structural fixes.",
  },
];

const useCases = [
  {
    title: "Category leaders protecting position",
    description: "You rank well in search, but AI assistants recommend three competitors and omit you. The audit shows exactly where the gap is and what to fix first.",
  },
  {
    title: "Teams entering or defining a category",
    description: "You are building a new category or repositioning. AI models have no structured source to draw from yet. The audit identifies the content and citation strategy to establish your narrative early.",
  },
  {
    title: "Growth teams tracking competitive threats",
    description: "A competitor suddenly appears in every AI recommendation in your space. The audit benchmarks your position against three named competitors and shows what they are doing differently.",
  },
];

const faqs = [
  {
    question: "What makes this different from a traditional SEO audit?",
    answer:
      "SEO audits measure search rankings. We measure whether your brand appears and is described accurately inside AI-generated answers — a fundamentally different surface. The audit includes per-query evidence, not keyword reports.",
  },
  {
    question: "How does this relate to GEO (Generative Engine Optimization)?",
    answer:
      "GEO is the practice of optimizing content so it is cited by AI systems. Our audit measures the outcome of your current GEO posture — how visible and accurate your brand is across major LLMs — and the roadmap tells you where to focus GEO efforts for the highest impact.",
  },
  {
    question: "How long does the audit take?",
    answer: "5–7 business days from intake completion to delivery. Intake itself is a short questionnaire.",
  },
  {
    question: "Which models do you test?",
    answer: "ChatGPT, Claude, Gemini, and Perplexity are included in the standard audit. Each query is tested across all four.",
  },
  {
    question: "What do you deliver?",
    answer:
      "A PDF report with screenshots, a visibility scorecard, competitive matrix, and a prioritized action roadmap. A walkthrough call is included.",
  },
  {
    question: "Can you implement the recommendations?",
    answer:
      "Yes. Implementation sprints and monitoring retainers are available as separate engagements after the audit. The audit becomes the scoping brief.",
  },
];

export default function HomePage() {
  return (
    <>
      <ServiceSchema
        name="AI Visibility Audit"
        description="Fixed-scope audit measuring your brand's visibility and accuracy across ChatGPT, Claude, Gemini, and Perplexity."
        price="500"
        url="/audit"
      />
      <FaqSchema items={faqs} />

      <Section className="pt-20 md:pt-24">
        <div className="max-w-4xl">
          <p className="eyebrow mb-4">The discovery layer has shifted</p>
          <h1 className="mb-6 text-balance">Your buyers are asking AI for recommendations. Is your brand in the answer?</h1>
          <p className="lead max-w-2xl mb-8">
            We audit how ChatGPT, Claude, Gemini, and Perplexity describe your brand across 20 strategic queries — then
            deliver a scored baseline and a prioritized roadmap to fix what&apos;s wrong.
          </p>
          <ul className="list-check mb-8 max-w-2xl text-muted-foreground">
            <li>Fixed-scope €500 audit. Methodology documented end to end.</li>
            <li>Query-level evidence with screenshots, not generic SEO claims.</li>
            <li>Built for founders, CMOs, and growth leaders making resource decisions.</li>
          </ul>
          <div className="flex flex-wrap gap-4">
            <TrackedLink
              href="/audit"
              className="btn btn-primary btn-lg"
              eventName="cta_click"
              eventParams={{ location: "home_hero", cta: "Get your baseline" }}
            >
              Get your baseline <ArrowRight size={18} />
            </TrackedLink>
            <TrackedLink
              href="/method"
              className="btn btn-secondary btn-lg"
              eventName="cta_click"
              eventParams={{ location: "home_hero", cta: "See methodology" }}
            >
              See methodology
            </TrackedLink>
          </div>
        </div>
      </Section>

      <Section className="bg-secondary/30">
        <div className="grid-2-col items-start">
          <div>
            <p className="eyebrow mb-4">Definition</p>
            <h2 className="mb-6">What &ldquo;AI visibility&rdquo; actually means</h2>
            <p className="text-muted-foreground mb-4">
              AI visibility is the share of category-relevant queries where your brand appears and is described accurately in
              AI-generated answers. It is not traffic — it is whether you make the shortlist inside the model response.
            </p>
            <p className="text-muted-foreground">
              Traditional SEO optimizes for search rankings. Generative Engine Optimization (GEO) optimizes for inclusion in
              AI-generated answers. We measure the outcome of both: whether your brand is actually present, accurate, and
              recommended when buyers ask.
            </p>
          </div>
          <div className="card-minimal bg-background">
            <p className="eyebrow mb-3">What we measure</p>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-3">
                <CheckCircle2 size={16} className="text-foreground mt-0.5" />
                Visibility score by query and model (0–100).
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 size={16} className="text-foreground mt-0.5" />
                Accuracy and hallucination flags against authoritative sources.
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 size={16} className="text-foreground mt-0.5" />
                Competitive displacement across 3 named competitors.
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 size={16} className="text-foreground mt-0.5" />
                Citation quality and source attribution patterns.
              </li>
            </ul>
          </div>
        </div>
      </Section>

      <Section>
        <p className="eyebrow mb-4">What&apos;s at stake</p>
        <h2 className="mb-4 max-w-3xl">The shortlist is forming before anyone visits your website</h2>
        <p className="lead max-w-2xl mb-8">
          When a buyer asks an AI assistant &ldquo;What are the best tools for [your category]?&rdquo; — the answer shapes their shortlist. Three risks compound if you are not managing this.
        </p>
        <div className="grid-3-col">
          {[
            {
              title: "Invisible",
              description: "A prospect asks ChatGPT for recommendations in your category. Four competitors are named. You are not. The deal starts without you in the room.",
            },
            {
              title: "Inaccurate",
              description: "An LLM describes your product with outdated pricing, a discontinued feature, or a wrong integration. The buyer moves on before you can correct it.",
            },
            {
              title: "Displaced",
              description: "A competitor publishes structured, citation-ready content. AI assistants start recommending them by default. You lose position without knowing it.",
            },
          ].map((risk) => (
            <div key={risk.title} className="card-minimal">
              <h3 className="mb-3">{risk.title}</h3>
              <p className="text-muted-foreground">{risk.description}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <p className="eyebrow mb-4">Methodology</p>
        <h2 className="mb-8 max-w-2xl">Five phases, one clear outcome</h2>
        <div className="grid-3-col">
          {phases.map((phase) => (
            <div key={phase.title} className="card-minimal">
              <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center mb-4">
                <phase.icon size={22} />
              </div>
              <h3 className="text-lg mb-3">{phase.title}</h3>
              <p className="text-muted-foreground mb-4">{phase.description}</p>
              <p className="text-small">Output: {phase.output}</p>
            </div>
          ))}
        </div>
        <div className="mt-10">
          <TrackedLink
            href="/method"
            className="btn btn-secondary btn-md"
            eventName="cta_click"
            eventParams={{ location: "home_method", cta: "View full methodology" }}
          >
            View full methodology
          </TrackedLink>
        </div>
      </Section>

      <Section className="bg-secondary/30">
        <p className="eyebrow mb-4">Sample output</p>
        <h2 className="mb-8 max-w-2xl">What the audit delivers</h2>
        <div className="grid-2-col">
          {deliverables.map((item) => (
            <div key={item.title} className="card-minimal bg-background">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                  <FileText size={18} />
                </div>
                <div>
                  <h3 className="text-lg mb-2">{item.title}</h3>
                  <p className="text-small">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-10">
          <TrackedLink
            href="/deliverables"
            className="btn btn-secondary btn-md"
            eventName="cta_click"
            eventParams={{ location: "home_deliverables", cta: "Explore deliverables" }}
          >
            Explore deliverables
          </TrackedLink>
        </div>
      </Section>

      <Section>
        <p className="eyebrow mb-4">Use cases</p>
        <h2 className="mb-8 max-w-2xl">Built for the decisions you are making right now</h2>
        <div className="grid-3-col">
          {useCases.map((item) => (
            <div key={item.title} className="card-minimal">
              <h3 className="mb-3">{item.title}</h3>
              <p className="text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <p className="eyebrow mb-4">FAQ</p>
        <h2 className="mb-8 max-w-2xl">Common questions</h2>
        <div className="grid-2-col">
          {faqs.map((item) => (
            <div key={item.question} className="card-minimal">
              <h3 className="text-lg mb-3">{item.question}</h3>
              <p className="text-muted-foreground text-sm">{item.answer}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <div className="text-center max-w-2xl mx-auto">
          <p className="eyebrow mb-4">Next step</p>
          <h2 className="mb-6">Know where you stand before deciding what to build</h2>
          <p className="lead mb-8">
            €500. Fixed scope. A scored baseline, competitive comparison, and a sequenced roadmap — delivered in 5–7 business days.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <TrackedLink
              href="/audit"
              className="btn btn-primary btn-lg"
              eventName="cta_click"
              eventParams={{ location: "home_final", cta: "Get your baseline" }}
            >
              Get your baseline <ArrowRight size={18} />
            </TrackedLink>
            <TrackedLink
              href="/contact"
              className="btn btn-secondary btn-lg"
              eventName="cta_click"
              eventParams={{ location: "home_final", cta: "Talk to us first" }}
            >
              Talk to us first
            </TrackedLink>
          </div>
        </div>
      </Section>
    </>
  );
}
