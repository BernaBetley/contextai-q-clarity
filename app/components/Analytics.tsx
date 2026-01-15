"use client";

import { useEffect, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { trackEvent } from "../lib/analytics";

function AnalyticsTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const qs = searchParams?.toString();
    const page_path = qs ? `${pathname}?${qs}` : pathname;
    trackEvent("page_view", { page_path });
  }, [pathname, searchParams]);

  return null;
}

export function Analytics() {
  return (
    <Suspense fallback={null}>
      <AnalyticsTracker />
    </Suspense>
  );
}

