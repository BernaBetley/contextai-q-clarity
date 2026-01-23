"use client";

import { useState } from "react";

import { trackEvent } from "../lib/analytics";

type StripeCheckoutButtonProps = {
  className?: string;
  children: React.ReactNode;
  product?: "audit";
  eventName?: string;
  eventParams?: Record<string, string | number | boolean | undefined>;
};

export function StripeCheckoutButton({
  className,
  children,
  product = "audit",
  eventName,
  eventParams,
}: StripeCheckoutButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    if (isLoading) return;
    setIsLoading(true);

    if (eventName) trackEvent(eventName, eventParams);

    try {
      const response = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ product }),
      });

      const data = (await response.json().catch(() => null)) as { url?: string; error?: string } | null;
      if (!response.ok || !data?.url) {
        // As a safe fallback, send users to Contact to request an invoice.
        window.location.href = "/contact";
        return;
      }

      window.location.href = data.url;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={className}
      disabled={isLoading}
      aria-busy={isLoading}
    >
      {children}
    </button>
  );
}

