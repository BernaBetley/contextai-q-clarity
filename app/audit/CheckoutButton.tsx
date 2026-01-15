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

      const res = await fetch("/api/checkout", { method: "POST", cache: "no-store" });
      const contentType = res.headers.get("content-type") || "";
      const raw = await res.text();
      const trimmed = raw.trim();

      const isJson = contentType.includes("application/json");
      const parsed =
        isJson && trimmed
          ? (() => {
              try {
                return JSON.parse(trimmed) as unknown;
              } catch {
                return null;
              }
            })()
          : null;

      const data = (parsed && typeof parsed === "object" ? parsed : {}) as { url?: string; error?: string };
      const message = data.error || (trimmed ? trimmed.slice(0, 400) : `Checkout failed (${res.status}).`);

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

