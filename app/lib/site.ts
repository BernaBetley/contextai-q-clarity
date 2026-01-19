import "server-only";

import { env } from "./env.server";

export const siteConfig = {
  name: "ContextAI Q",
  url: env.NEXT_PUBLIC_SITE_URL,
  description:
    "ContextAI Q measures how brands appear in AI-generated answers and delivers a fixed-scope AI Visibility Audit with a clear action roadmap.",
  ogImage: "/contextaiq_logo_bw.png",
  logo: "/contextaiq_logo_bw.svg",
  contactEmail: "hello@contextaiq.com",
  location: "Portugal",
};
