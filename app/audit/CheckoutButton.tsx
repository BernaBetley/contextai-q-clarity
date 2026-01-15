"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function CheckoutButton({ label = "Purchase Audit" }: { label?: string }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");

  async function startCheckout() {
    setError("");
    setIsLoading(true);

    try {
      if (typeof window !== "undefined" && typeof window.gtag === "function") {
        window.gtag("event", "checkout_click", { product: "audit" });
      }

      const res = await fetch("/api/checkout", { method: "POST" });
      const contentType = res.headers.get("content-type") || "";
      const payload = contentType.includes("application/json") ? await res.json() : await res.text();

      const data = (typeof payload === "object" ? payload : {}) as { url?: string; error?: string };
      const message =
        typeof payload === "string"
          ? payload.slice(0, 400)
          : data.error || (res.ok ? "" : `Checkout failed (${res.status}).`);

      if (!res.ok || !data.url) {
        throw new Error(message || "Checkout failed.");
      }

      window.location.href = data.url;
    } catch (e) {
      setError(e instanceof Error ? e.message : "Checkout failed.");
      setIsLoading(false);
    }
  }

  return (
    <div>
      <button
        type="button"
        onClick={startCheckout}
        disabled={isLoading}
        className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-8 py-6 text-base font-medium text-primary-foreground shadow-elevated transition-all duration-200 hover:shadow-prominent hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50"
      >
        {isLoading ? "Redirecting…" : label} <ArrowRight size={18} />
      </button>
      {error ? <p className="text-small mt-3 text-destructive">{error}</p> : null}
    </div>
  );
}

