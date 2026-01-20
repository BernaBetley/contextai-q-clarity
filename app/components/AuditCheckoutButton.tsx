"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";

import { trackEvent } from "../lib/analytics";

interface AuditCheckoutButtonProps {
  className?: string;
  children: React.ReactNode;
  eventParams?: Record<string, string | number | boolean | undefined>;
}

export function AuditCheckoutButton({ className, children, eventParams }: AuditCheckoutButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    if (eventParams) {
      trackEvent("cta_click", eventParams);
    }

    try {
      const res = await fetch("/api/checkout", { method: "POST" });
      if (!res.ok) throw new Error("Checkout failed");
      const { url } = await res.json();
      window.location.href = url;
    } catch (error) {
      console.error(error);
      setLoading(false);
      alert("Something went wrong initializing checkout. Please contact us.");
    }
  };

  return (
    <button onClick={handleClick} disabled={loading} className={className}>
      {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
      {children}
    </button>
  );
}
