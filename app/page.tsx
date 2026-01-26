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
    title: "Scope & question-set design",
    description: "Define 20 strategic buyer questions across brand, category, and use-case intent.",
    output: "Validated question set and success criteria.",
    icon: Search,
  },
  {
    title: "Multi-LLM testing",
    description: "Run the question set across ChatGPT, Claude, Gemini, and Perplexity.",
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
    description: "Question-level scores by model with clear baselines.",
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
    title: "Category leadership defense",
    description: "Protect visibility when buyers ask LLMs for category recommendations.",
  },
  {
    title: "New category creation",
    description: "Define how LLMs describe your category and who they cite first.",
  },
  {
    title: "Competitive displacement",
    description: "Identify where competitors appear and why you do not.",
  },
];

const faqs = [
  {
    question: "What makes this different from a traditional SEO audit?",
    answer:
      "We measure visibility inside LLM answers, not search rankings. The audit focuses on how AI systems cite and describe your brand, with evidence and scoring per question.",
  },
  {
    question: "How long does the audit take?",
    answer: "5–7 business days from intake completion to delivery.",
  },
  {
    question: "Which models do you test?",
    answer: "ChatGPT, Claude, Gemini, and Perplexity are included in the standard audit.",
  },
  {
    question: "What do you deliver?",
    answer:
      "A PDF report, visibility scorecard, competitive matrix, and a prioritized action roadmap. A walkthrough call is included.",
  },
  {
    question: "Can you implement the recommendations?",
    answer:
      "Yes. Implementation and monitoring are available as separate engagements after the audit.",
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

      <Section className="pt-24 md:pt-32">
        <div className="max-w-4xl">
          <p className="eyebrow mb-4">AI Visibility Audit for B2B teams</p>
          <h1 className="mb-6 text-balance">Know exactly how LLMs describe your brand — and what to fix.</h1>
          <p className="lead max-w-2xl mb-8">
            We test 20 strategic buyer questions across ChatGPT, Claude, Gemini, and Perplexity, score visibility and accuracy,
            and deliver a prioritized roadmap in 5–7 business days.
          </p>
          <ul className="list-check mb-10 max-w-2xl text-muted-foreground">
            <li>Fixed-scope €500 audit with documented methodology.</li>
            <li>Evidence at the question level, not generic SEO claims.</li>
            <li>Designed for founders, CMOs, growth leaders, and AI/SEO leads.</li>
          </ul>
          <div className="flex flex-wrap gap-4">
            <TrackedLink
              href="/audit"
              className="btn btn-primary btn-lg"
              eventName="cta_click"
              eventParams={{ location: "home_hero", cta: "Start the audit" }}
            >
              Start the audit <ArrowRight size={18} />
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
            <h2 className="mb-6">What “AI visibility” actually means</h2>
            <p className="text-muted-foreground">
              AI visibility is the share of category-relevant questions where your brand appears and is described accurately
              in AI-generated answers. It is not traffic; it is whether you make the shortlist inside the model response.
            </p>
          </div>
          <div className="card-minimal bg-background">
            <p className="eyebrow mb-3">What we measure</p>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-3">
                <CheckCircle2 size={16} className="text-foreground mt-0.5" />
                Visibility score by question and model (0–100).
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 size={16} className="text-foreground mt-0.5" />
                Accuracy and hallucination flags against authoritative sources.
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 size={16} className="text-foreground mt-0.5" />
                Competitive displacement across 3 named competitors.
              </li>
            </ul>
          </div>
        </div>
      </Section>

      <Section>
        <p className="eyebrow mb-4">What’s at stake</p>
        <h2 className="mb-12 max-w-2xl">The AI discovery gap is widening</h2>
        <div className="grid-3-col">
          {[
            {
              title: "Invisibility",
              description: "Your brand is absent from AI-generated recommendations in your category.",
            },
            {
              title: "Inaccuracy",
              description: "LLMs present outdated or incorrect information about your product or positioning.",
            },
            {
              title: "Displacement",
              description: "Competitors are recommended because their sources are more citation-ready.",
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
        <h2 className="mb-12 max-w-2xl">Five phases, one clear outcome</h2>
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
        <h2 className="mb-12 max-w-2xl">What the audit delivers</h2>
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
        <h2 className="mb-12 max-w-2xl">Built for teams under pressure to be cited correctly</h2>
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
        <h2 className="mb-12 max-w-2xl">Common questions</h2>
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
          <h2 className="mb-6">Start with a €500 audit</h2>
          <p className="lead mb-10">
            Get a quantified baseline, a clear competitive picture, and a roadmap you can execute.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <TrackedLink
              href="/audit"
              className="btn btn-primary btn-lg"
              eventName="cta_click"
              eventParams={{ location: "home_final", cta: "Start the audit" }}
            >
              Start the audit <ArrowRight size={18} />
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
