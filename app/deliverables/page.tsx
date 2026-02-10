import type { Metadata } from "next";
import { ArrowRight, FileText, LayoutGrid, ListChecks, Table2, Target } from "lucide-react";

import { TrackedLink } from "../components/TrackedLink";
import { buildMetadata } from "../lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Deliverables",
  description: "See exactly what you receive in the AI Visibility Audit: scorecards, evidence, and a prioritized roadmap.",
  path: "/deliverables",
});

const deliverables = [
  {
    title: "Executive summary",
    description: "Leadership-ready overview of visibility, accuracy, and top risks.",
    icon: FileText,
  },
  {
    title: "Visibility scorecard",
    description: "Query-level scores across each LLM with a clear baseline.",
    icon: Table2,
  },
  {
    title: "Evidence archive",
    description: "Screenshots and citations of how LLMs describe you today.",
    icon: LayoutGrid,
  },
  {
    title: "Competitive matrix",
    description: "Head-to-head comparison with 3 named competitors.",
    icon: ListChecks,
  },
  {
    title: "Action roadmap",
    description: "Sequenced recommendations by impact and effort.",
    icon: Target,
  },
];

export default function DeliverablesPage() {
  return (
    <>
      <section className="section-slide pt-20 md:pt-24">
        <div className="container-wide">
          <p className="eyebrow mb-4">Deliverables</p>
          <h1 className="mb-6 max-w-3xl">A concrete output you can act on immediately</h1>
          <p className="lead max-w-2xl">
            The AI Visibility Audit delivers proof, scoring, and a prioritized roadmap. Every item is tied to evidence from
            real LLM responses.
          </p>
        </div>
      </section>

      <section className="section-slide">
        <div className="container-wide">
          <div className="grid-3-col">
            {deliverables.map((item) => (
              <div key={item.title} className="card-minimal">
                <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center mb-4">
                  <item.icon size={22} />
                </div>
                <h2 className="text-lg mb-3">{item.title}</h2>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-slide bg-secondary/30">
        <div className="container-wide">
          <p className="eyebrow mb-4">Sample output</p>
          <h2 className="mb-8">Visibility scorecard (illustrative)</h2>
          <div className="overflow-x-auto card-minimal bg-background">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="text-left border-b border-border">
                  <th className="py-3 pr-4 font-semibold">Query</th>
                  <th className="py-3 pr-4 font-semibold">ChatGPT</th>
                  <th className="py-3 pr-4 font-semibold">Claude</th>
                  <th className="py-3 pr-4 font-semibold">Gemini</th>
                  <th className="py-3 pr-4 font-semibold">Perplexity</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b border-border">
                  <td className="py-3 pr-4">“Best AI visibility tools for B2B SaaS”</td>
                  <td className="py-3 pr-4">62</td>
                  <td className="py-3 pr-4">58</td>
                  <td className="py-3 pr-4">41</td>
                  <td className="py-3 pr-4">70</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-3 pr-4">“Alternatives to [competitor]”</td>
                  <td className="py-3 pr-4">48</td>
                  <td className="py-3 pr-4">52</td>
                  <td className="py-3 pr-4">35</td>
                  <td className="py-3 pr-4">61</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4">“[Your category] pricing comparison”</td>
                  <td className="py-3 pr-4">55</td>
                  <td className="py-3 pr-4">49</td>
                  <td className="py-3 pr-4">38</td>
                  <td className="py-3 pr-4">63</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-small mt-4 text-muted-foreground">
            Scores reflect visibility + accuracy (0–100). Actual scores are derived from your query set and evidence archive.
          </p>
        </div>
      </section>

      <section className="section-slide">
        <div className="container-wide text-center">
          <h2 className="mb-6">Ready for your own scorecard?</h2>
          <p className="lead max-w-xl mx-auto mb-8">Start with the fixed-scope €500 audit.</p>
          <TrackedLink
            href="/audit"
            className="btn btn-primary btn-lg"
            eventName="cta_click"
            eventParams={{ location: "deliverables_final", cta: "Start the audit" }}
          >
            Start the audit <ArrowRight size={18} />
          </TrackedLink>
        </div>
      </section>
    </>
  );
}
