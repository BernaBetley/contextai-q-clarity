export type ProductSlug =
  | "diagnostico"
  | "conversao"
  | "backoffice"
  | "suporte"
  | "visibilidade";

export type Product = {
  slug: ProductSlug;
  name: string;
  shortName: string;
  href: string;
  eyebrow: string;
  promise: string;
  summary: string;
  unit: string;
  commercial: string;
  featured?: boolean;
  nested?: boolean;
  priceNote?: string;
  outcomes: string[];
  notThis: string[];
};

export const products: Product[] = [
  {
    slug: "diagnostico",
    name: "Prova Diagnóstico",
    shortName: "Diagnóstico",
    href: "/prova/diagnostico",
    eyebrow: "Entrada paga",
    promise: "Um processo. Uma unidade de resultado. Uma proposta Prova.",
    summary:
      "Mapeamos um processo da operação, definimos a unidade que importa (conversão, ciclo, ticket) e entregamos o briefing do agente. Pago. Não é workshop gratuito.",
    unit: "Briefing de processo + unidade de resultado + proposta de honorários",
    commercial: "Honorário fixo, âmbito fechado na primeira conversa.",
    featured: true,
    outcomes: [
      "Escolha de um único processo com volume e dono claros.",
      "Baseline do desempenho actual (quando os dados existem).",
      "Unidade de sucesso proposta (ex. reunião incremental, factura processada).",
      "Recomendação Prova (Conversão, Backoffice ou Suporte) com lógica de setup + sucesso.",
    ],
    notThis: [
      "Não é consultoria estratégica gratuita.",
      "Não é um roadmap de 40 iniciativas.",
      "Não implementa o agente (isso é o produto seguinte).",
    ],
  },
  {
    slug: "conversao",
    name: "Prova Conversão",
    shortName: "Conversão",
    href: "/prova/conversao",
    eyebrow: "Oferta principal",
    promise: "Mais conversões incrementais. Setup + € por unidade acima do baseline.",
    summary:
      "Um agente no processo comercial: qualificação, follow-up ou pedido. Medimos o baseline. Cobramos setup e uma taxa por conversão incremental.",
    unit: "Conversão incremental vs baseline acordado",
    commercial: "Setup + € / conversão incremental (ou % do valor incremental).",
    featured: true,
    outcomes: [
      "Agente num único ponto do funil (inbound, follow-up, marcação).",
      "Baseline escrito: taxa e volume do período de referência.",
      "Taxa de sucesso só sobre o incremental, com período e tecto.",
      "Relatório periódico da unidade, não slides de 'adopção de IA'.",
    ],
    notThis: [
      "Não é um chatbot genérico no site sem métrica.",
      "Não é retainer mensal opaco.",
      "Não cobramos o volume que já existia antes do agente.",
    ],
  },
  {
    slug: "backoffice",
    name: "Prova Backoffice",
    shortName: "Backoffice",
    href: "/prova/backoffice",
    eyebrow: "Operações",
    promise: "Um processo administrativo em produção. Unidade por documento ou ciclo concluído.",
    summary:
      "Agente em facturas, CRM, documentos ou um fluxo interno repetível. Setup + sucesso por unidade concluída com qualidade aceite.",
    unit: "Documento, ciclo ou registo concluído com critério de qualidade",
    commercial: "Setup + € / unidade concluída (acima do ritmo baseline, se aplicável).",
    outcomes: [
      "Um fluxo (não 'a empresa toda').",
      "Critério de aceitação escrito (campos, excepções, escalamento humano).",
      "Medição de unidades processadas e taxa de retrabalho.",
    ],
    notThis: [
      "Não é RPA de catálogo sem dono de processo.",
      "Não substituímos o ERP. Integramos o processo que dói.",
    ],
  },
  {
    slug: "suporte",
    name: "Prova Suporte",
    shortName: "Suporte",
    href: "/prova/suporte",
    eyebrow: "Serviço ao cliente",
    promise: "Primeira resposta e resolução no canal que já usam. Unidade: ticket resolvido.",
    summary:
      "Agente de suporte no email, WhatsApp ou helpdesk. Setup + sucesso por ticket resolvido dentro do critério, com escalamento humano.",
    unit: "Ticket resolvido dentro do critério (sem reabertura no prazo definido)",
    commercial: "Setup + € / ticket resolvido (ou mix com tempo de primeira resposta).",
    outcomes: [
      "Âmbito de intenções coberto vs. escalado.",
      "Baseline de volume, primeira resposta e resolução.",
      "Guardrails: o que o agente nunca fecha sozinho.",
    ],
    notThis: [
      "Não é um FAQ público sem ligação ao vosso processo.",
      "Não medimos 'mensagens enviadas'. Medimos resolução.",
    ],
  },
  {
    slug: "visibilidade",
    name: "Prova Visibilidade",
    shortName: "Visibilidade",
    href: "/prova/visibilidade",
    eyebrow: "Produto aninhado",
    promise: "Auditoria de visibilidade em respostas de IA. €500, âmbito fixo.",
    summary:
      "Como ChatGPT, Claude, Gemini e Perplexity descrevem a vossa marca em 20 perguntas estratégicas. Scorecard, evidência e roadmap. Não é o produto hero da prática.",
    unit: "Scorecard 0-100 + evidência + roadmap",
    commercial: "€500, pagamento único, 5-7 dias úteis após intake.",
    nested: true,
    priceNote: "€500",
    outcomes: [
      "20 perguntas, 4 modelos, 3 concorrentes.",
      "Scorecard de visibilidade e precisão.",
      "Arquivo de evidência (capturas e citações).",
      "Roadmap priorizado. Walkthrough opcional de 30 minutos.",
    ],
    notThis: [
      "Não é um audit SEO clássico.",
      "Não implementa as recomendações (trabalho separado).",
      "Não substitui Prova Conversão, Backoffice ou Suporte.",
    ],
  },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((item) => item.slug === slug);
}

export const coreProducts = products.filter((item) => !item.nested);
export const nestedProducts = products.filter((item) => item.nested);
