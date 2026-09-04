import "server-only";

import { env } from "./env.server";

export const siteConfig = {
  name: "ContextAIQ",
  productLine: "Prova",
  legalEntity: "Resultado Fidalgo",
  url: env.NEXT_PUBLIC_SITE_URL,
  description:
    "A ContextAIQ vende Prova: agentes de IA práticos para PME portuguesas, num processo, com resultados medidos e honorários híbridos (setup + sucesso).",
  ogImage: "/contextaiq_logo_bw.png",
  logo: "/mark.svg",
  contactEmail: "hello@contextaiq.com",
  location: "Portugal",
};
