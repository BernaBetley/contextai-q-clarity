"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface CompetitorInput {
  name: string;
  website: string;
}

export default function NewAuditPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    clientName: "",
    clientEmail: "",
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

    // Create audit
    const res = await fetch("/api/audit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-admin-password": "session",
      },
      body: JSON.stringify({ ...form, competitors }),
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.error ?? "Failed to create audit");
      setLoading(false);
      return;
    }

    const { audit } = await res.json();

    // Trigger pipeline
    await fetch(`/api/audit/${audit.id}/run`, {
      method: "POST",
      headers: { "x-admin-password": "session" },
    });

    router.push(`/admin/audit/${audit.id}`);
  }

  return (
    <>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold">New Audit</h1>
        <p className="text-sm text-surface-500 mt-1">
          Fill in client details to generate a complete AI Visibility Audit.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="max-w-3xl space-y-8">
        {/* Client info */}
        <fieldset className="card space-y-4">
          <legend className="text-sm font-semibold text-surface-500 uppercase tracking-wider mb-2">
            Client
          </legend>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Name</label>
              <input
                className="input"
                required
                value={form.clientName}
                onChange={(e) => updateField("clientName", e.target.value)}
              />
            </div>
            <div>
              <label className="label">Email</label>
              <input
                className="input"
                type="email"
                required
                value={form.clientEmail}
                onChange={(e) => updateField("clientEmail", e.target.value)}
              />
            </div>
          </div>
        </fieldset>

        {/* Company info */}
        <fieldset className="card space-y-4">
          <legend className="text-sm font-semibold text-surface-500 uppercase tracking-wider mb-2">
            Company
          </legend>
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
                onChange={(e) => updateField("companyWebsite", e.target.value)}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Industry / Category</label>
              <input
                className="input"
                required
                value={form.industry}
                onChange={(e) => updateField("industry", e.target.value)}
              />
            </div>
            <div>
              <label className="label">Target audience</label>
              <input
                className="input"
                required
                value={form.targetAudience}
                onChange={(e) => updateField("targetAudience", e.target.value)}
              />
            </div>
          </div>
          <div>
            <label className="label">Product / service description</label>
            <textarea
              className="textarea"
              required
              rows={3}
              value={form.companyDescription}
              onChange={(e) =>
                updateField("companyDescription", e.target.value)
              }
              placeholder="What does the company do? What problem does it solve?"
            />
          </div>
        </fieldset>

        {/* Competitors */}
        <fieldset className="card space-y-4">
          <legend className="text-sm font-semibold text-surface-500 uppercase tracking-wider mb-2">
            Competitors (3)
          </legend>
          {competitors.map((comp, i) => (
            <div key={i} className="grid grid-cols-2 gap-4">
              <div>
                <label className="label">Competitor {i + 1} name</label>
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
        </fieldset>

        {/* Fact sheet */}
        <fieldset className="card space-y-4">
          <legend className="text-sm font-semibold text-surface-500 uppercase tracking-wider mb-2">
            Accuracy baseline
          </legend>
          <div>
            <label className="label">
              Fact sheet
              <span className="text-surface-400 font-normal ml-1">
                — key facts to verify AI responses against
              </span>
            </label>
            <textarea
              className="textarea"
              required
              rows={6}
              value={form.factSheet}
              onChange={(e) => updateField("factSheet", e.target.value)}
              placeholder="Pricing, features, founding date, key integrations, positioning claims, etc."
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
              rows={2}
              value={form.priorityTopics}
              onChange={(e) => updateField("priorityTopics", e.target.value)}
              placeholder="Specific topics or queries you care most about"
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
              placeholder="Anything else that would help scope the audit"
            />
          </div>
        </fieldset>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-md p-4 text-sm text-red-700">
            {error}
          </div>
        )}

        <div className="flex items-center gap-4">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? "Creating audit..." : "Create & run audit"}
          </button>
          <p className="text-xs text-surface-500">
            This will generate 20 queries, test across 3 LLMs, score, analyze,
            and generate a PDF report.
          </p>
        </div>
      </form>
    </>
  );
}
