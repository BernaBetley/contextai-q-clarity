"use client";

import { useState } from "react";

import { trackEvent } from "../lib/analytics";

type FormStatus = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "submitting") return;

    setStatus("submitting");
    setErrorMessage(null);

    const formData = new FormData(event.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const data = (await response.json().catch(() => null)) as { error?: string } | null;
        throw new Error(data?.error ?? "Something went wrong. Please try again.");
      }

      trackEvent("form_submit", { form: "contact" });
      setStatus("success");
      event.currentTarget.reset();
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unable to submit the form.";
      setErrorMessage(message);
      setStatus("error");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6" aria-live="polite">
      <div className="grid md:grid-cols-2 gap-4">
        <label className="space-y-2 text-sm font-medium">
          <span>Name</span>
          <input name="name" required className="input-field" placeholder="Your name" autoComplete="name" />
        </label>
        <label className="space-y-2 text-sm font-medium">
          <span>Work email</span>
          <input
            name="email"
            type="email"
            required
            className="input-field"
            placeholder="name@company.com"
            autoComplete="email"
          />
        </label>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <label className="space-y-2 text-sm font-medium">
          <span>Company</span>
          <input name="company" className="input-field" placeholder="Company name" autoComplete="organization" />
        </label>
        <label className="space-y-2 text-sm font-medium">
          <span>Role</span>
          <input name="role" className="input-field" placeholder="Founder, CMO, Growth..." autoComplete="organization-title" />
        </label>
      </div>

      <label className="space-y-2 text-sm font-medium">
        <span>Website</span>
        <input name="website" className="input-field" placeholder="https://company.com" autoComplete="url" />
      </label>

      <label className="space-y-2 text-sm font-medium">
        <span>What do you want to improve?</span>
        <textarea
          name="message"
          required
          className="textarea-field"
          placeholder="Share your category, target questions, competitors, and goals."
        />
      </label>

      <label className="space-y-2 text-sm font-medium">
        <span>Timeline</span>
        <select name="timeline" className="input-field">
          <option value="This month">This month</option>
          <option value="This quarter">This quarter</option>
          <option value="This half">This half</option>
          <option value="Exploring">Exploring</option>
        </select>
      </label>

      <div className="flex flex-wrap items-center gap-4">
        <button type="submit" className="btn btn-primary btn-md" disabled={status === "submitting"}>
          {status === "submitting" ? "Sending..." : "Send message"}
        </button>
        <span className="text-small text-muted-foreground">We reply within one business day.</span>
      </div>

      {status === "success" ? (
        <p className="text-small text-foreground">Thanks — we received your message and will respond shortly.</p>
      ) : null}

      {status === "error" ? <p className="text-small text-destructive">{errorMessage}</p> : null}
    </form>
  );
}
