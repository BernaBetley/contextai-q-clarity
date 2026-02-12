"use client";

import { useState } from "react";
import { useParams } from "next/navigation";

interface CompetitorInput {
  name: string;
  website: string;
}

export default function IntakePage() {
  const params = useParams();
  const auditId = params.id as string;

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    clientName: "",
    companyName: "",
    companyWebsite: "",
    industry: "",
    companyDescription: "",
    targetAudience: "",
    factSheet: "",
    priorityTopics: "",
    additionalContext: "",
  });

  const [competitors, setCompetitors] = useState<CompetitorInput[]>([
    { name: "", website: "" },
    { name: "", website: "" },
    { name: "", website: "" },
  ]);

  function updateField(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function updateCompetitor(
    index: number,
    field: "name" | "website",
    value: string
  ) {
    setCompetitors((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: value };
      return next;
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch(`/api/audit/${auditId}/intake`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, competitors }),
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.error ?? "Submission failed");
      setLoading(false);
      return;
    }

    setSubmitted(true);
    setLoading(false);
  }

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface-50 p-6">
        <div className="max-w-md text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-8 h-8 text-green-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-semibold mb-3">
            Intake complete
          </h1>
          <p className="text-surface-600 leading-relaxed">
            Your AI Visibility Audit is now in progress. You will receive
            a detailed PDF report via email within 5-7 business days.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface-50 py-12 px-6">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <p className="text-sm text-surface-500 uppercase tracking-wider mb-2">
            ContextAI Q · AI Visibility Audit
          </p>
          <h1 className="text-2xl font-semibold mb-2">
            Audit Intake Form
          </h1>
          <p className="text-surface-600">
            This takes about 10 minutes. The more context you provide, the more
            precise the audit will be.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Your details */}
          <div className="card space-y-4">
            <h2 className="text-sm font-semibold text-surface-500 uppercase tracking-wider">
              Your details
            </h2>
            <div>
              <label className="label">Your name</label>
              <input
                className="input"
                required
                value={form.clientName}
                onChange={(e) => updateField("clientName", e.target.value)}
              />
            </div>
          </div>

          {/* Company */}
          <div className="card space-y-4">
            <h2 className="text-sm font-semibold text-surface-500 uppercase tracking-wider">
              Company
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="label">Company name</label>
                <input
                  className="input"
                  required
                  value={form.companyName}
                  onChange={(e) => updateField("companyName", e.target.value)}
                />
              </div>
              <div>
                <label className="label">Website</label>
                <input
                  className="input"
                  type="url"
                  required
                  placeholder="https://"
                  value={form.companyWebsite}
                  onChange={(e) =>
                    updateField("companyWebsite", e.target.value)
                  }
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="label">Industry / Category</label>
                <input
                  className="input"
                  required
                  placeholder="e.g. B2B SaaS, Fintech, E-commerce"
                  value={form.industry}
                  onChange={(e) => updateField("industry", e.target.value)}
                />
              </div>
              <div>
                <label className="label">Target audience</label>
                <input
                  className="input"
                  required
                  placeholder="e.g. CTOs at mid-market SaaS companies"
                  value={form.targetAudience}
                  onChange={(e) =>
                    updateField("targetAudience", e.target.value)
                  }
                />
              </div>
            </div>
            <div>
              <label className="label">
                What does your company do?
              </label>
              <textarea
                className="textarea"
                required
                rows={4}
                value={form.companyDescription}
                onChange={(e) =>
                  updateField("companyDescription", e.target.value)
                }
                placeholder="Describe your product/service, the problem it solves, and your key differentiators."
              />
            </div>
          </div>

          {/* Competitors */}
          <div className="card space-y-4">
            <h2 className="text-sm font-semibold text-surface-500 uppercase tracking-wider">
              Three competitors to benchmark against
            </h2>
            <p className="text-sm text-surface-500">
              Name the three competitors you want us to track in every query.
            </p>
            {competitors.map((comp, i) => (
              <div key={i} className="grid grid-cols-2 gap-4">
                <div>
                  <label className="label">Competitor {i + 1}</label>
                  <input
                    className="input"
                    required
                    value={comp.name}
                    onChange={(e) =>
                      updateCompetitor(i, "name", e.target.value)
                    }
                  />
                </div>
                <div>
                  <label className="label">Website</label>
                  <input
                    className="input"
                    type="url"
                    required
                    placeholder="https://"
                    value={comp.website}
                    onChange={(e) =>
                      updateCompetitor(i, "website", e.target.value)
                    }
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Fact sheet */}
          <div className="card space-y-4">
            <h2 className="text-sm font-semibold text-surface-500 uppercase tracking-wider">
              Accuracy baseline
            </h2>
            <p className="text-sm text-surface-500">
              We verify AI responses against these facts. The more complete this
              is, the more accurate the audit.
            </p>
            <div>
              <label className="label">
                Key facts about your company
              </label>
              <textarea
                className="textarea"
                required
                rows={8}
                value={form.factSheet}
                onChange={(e) => updateField("factSheet", e.target.value)}
                placeholder={`Include:
• Current pricing / plans
• Key features and integrations
• Founding date, team size, HQ location
• Positioning claims (what you say you are)
• Recent product launches or changes
• Anything an AI should know to describe you accurately`}
              />
            </div>
            <div>
              <label className="label">
                Priority topics
                <span className="text-surface-400 font-normal ml-1">
                  — optional
                </span>
              </label>
              <textarea
                className="textarea"
                rows={3}
                value={form.priorityTopics}
                onChange={(e) =>
                  updateField("priorityTopics", e.target.value)
                }
                placeholder="Any specific queries or topics you care most about?"
              />
            </div>
            <div>
              <label className="label">
                Additional context
                <span className="text-surface-400 font-normal ml-1">
                  — optional
                </span>
              </label>
              <textarea
                className="textarea"
                rows={2}
                value={form.additionalContext}
                onChange={(e) =>
                  updateField("additionalContext", e.target.value)
                }
                placeholder="Anything else that would help us scope your audit?"
              />
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-md p-4 text-sm text-red-700">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="btn btn-primary w-full py-3 text-base"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit & start audit"}
          </button>

          <p className="text-xs text-center text-surface-400">
            Your audit will be delivered within 5-7 business days.
          </p>
        </form>
      </div>
    </div>
  );
}
