type AnalyticsEventProps = Record<string, string | number | boolean | null | undefined>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function track(event: string, props?: AnalyticsEventProps) {
  if (typeof window === "undefined") return;

  // GA4 via gtag if present (loaded in index.html when VITE_GA4_MEASUREMENT_ID is set).
  if (typeof window.gtag === "function") {
    window.gtag("event", event, props ?? {});
  }
}

export function pageview(path: string) {
  track("page_view", { page_path: path });
}

