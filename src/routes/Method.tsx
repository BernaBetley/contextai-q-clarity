import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { SEO, WebPageSchema } from "@/components/layout/SEO";

export default function Method() {
  const steps = [
    {
      number: "1",
      title: "Question-Set Design",
      description:
        "Identify the 20 most strategic buyer questions for your brand. These include brand questions, category questions, competitive comparisons, and use-case intent.",
      inputs: ["Business context interview", "Buyer intent mapping", "Competitive landscape review"],
      outputs: ["Validated question set", "Question categories", "Priority ranking"],
    },
    {
      number: "2",
      title: "Multi-LLM Testing",
      description:
        "Execute each question across ChatGPT (GPT-4), Claude, and Gemini. Capture full responses with timestamps.",
      inputs: ["Question set", "LLM access", "Controlled testing environment"],
      outputs: ["Raw response database", "Screenshot archive", "Response metadata"],
    },
    {
      number: "3",
      title: "Visibility Scoring",
      description: "Score each response for brand appearance (0-40), prominence position (0-30), and information accuracy (0-30). Total score: 0-100.",
      inputs: ["Response database", "Brand fact sheet", "Scoring rubric"],
      outputs: ["Per-question scores", "Per-LLM scores", "Aggregate visibility index"],
    },
    {
      number: "4",
      title: "Accuracy Assessment",
      description: "Verify factual claims in responses against authoritative sources. Flag hallucinations, outdated information, and competitive misattribution.",
      inputs: ["Response content", "Official brand information", "Verification sources"],
      outputs: ["Accuracy score", "Error inventory", "Hallucination log"],
    },
    {
      number: "5",
      title: "Competitive Benchmarking",
      description: "Apply the same methodology to 3 named competitors. Generate head-to-head comparison matrix.",
      inputs: ["Competitor names", "Same question set", "Same LLMs"],
      outputs: ["Competitive matrix", "Gap analysis", "Position rankings"],
    },
    {
      number: "6",
      title: "Root Cause Analysis",
      description: "Identify why gaps exist. Analyze content structure, source availability, citation patterns, and knowledge graph presence.",
      inputs: ["Visibility gaps", "Content audit", "Technical review"],
      outputs: ["Cause categorization", "Fixability assessment", "Technical findings"],
    },
    {
      number: "7",
      title: "Recommendation Development",
      description: "Prioritize actions by impact and effort. Separate quick wins from strategic initiatives.",
      inputs: ["Gap analysis", "Root causes", "Client capabilities"],
      outputs: ["Ranked action list", "Quick wins", "Strategic roadmap"],
    },
    {
      number: "8",
      title: "Report Assembly",
      description: "Compile findings into executive summary and detailed report. Prepare walkthrough presentation.",
      inputs: ["All analysis outputs", "Recommendations", "Client context"],
      outputs: ["PDF report", "Executive summary", "Walkthrough video/call"],
    },
  ];

  return (
    <>
      <SEO
        title="Methodology"
        description="Step-by-step methodology for the ContextAI Q AI Visibility Audit. From question-set design through report delivery."
        canonical="/method"
      />
      <WebPageSchema
        title="ContextAI Q Methodology"
        description="Detailed methodology documentation."
        url="/method"
      />

      {/* Hero */}
      <section className="section-slide pt-24 md:pt-32">
        <div className="container-wide">
          <p className="eyebrow mb-4">Methodology</p>
          <h1 className="mb-6 max-w-3xl">How the audit works</h1>
          <p className="lead max-w-2xl">
            A transparent, step-by-step methodology. No black boxes.
          </p>
        </div>
      </section>

      {/* Steps */}
      <section className="section-slide">
        <div className="container-wide">
          <div className="max-w-4xl space-y-12">
            {steps.map((step, index) => (
              <div key={index} className="card-minimal">
                <div className="flex items-start gap-6">
                  <span className="text-4xl font-serif font-semibold text-muted-foreground flex-shrink-0">
                    {step.number}
                  </span>
                  <div className="flex-1">
                    <h2 className="text-2xl mb-3">{step.title}</h2>
                    <p className="text-muted-foreground mb-6">{step.description}</p>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <p className="eyebrow mb-2">Inputs</p>
                        <ul className="space-y-1">
                          {step.inputs.map((input, i) => (
                            <li key={i} className="text-sm text-muted-foreground">• {input}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <p className="eyebrow mb-2">Outputs</p>
                        <ul className="space-y-1">
                          {step.outputs.map((output, i) => (
                            <li key={i} className="text-sm">• {output}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-slide bg-secondary/30">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto text-center">
            <p className="eyebrow mb-4">Timeline</p>
            <h2 className="mb-8">5-7 business days</h2>
            <p className="text-muted-foreground">
              From kickoff call to report delivery. Walkthrough scheduled within 
              the following week based on your availability.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-slide">
        <div className="container-wide text-center">
          <h2 className="mb-6">Ready to apply this methodology?</h2>
          <p className="lead max-w-xl mx-auto mb-10">
            €500. Fixed scope. Delivered in 5-7 business days.
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
