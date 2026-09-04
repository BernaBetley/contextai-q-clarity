"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

import { trackEvent } from "../lib/analytics";

export function Analytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (typeof window.gtag !== "function") return;

    const qs = searchParams?.toString();
    const page_path = qs ? `${pathname}?${qs}` : pathname;
    window.gtag("event", "page_view", { page_path });

    if (pathname === "/metodo") {
      trackEvent("methodology_view", { page_path });
    }

    if (pathname === "/prova" || pathname?.startsWith("/prova/")) {
      trackEvent("pricing_view", { page_path });
    }

    if (pathname === "/contacto") {
      trackEvent("contact_view", { page_path });
    }
  }, [pathname, searchParams]);

  return null;
}
