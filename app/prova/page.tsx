import type { Metadata } from "next";

import { CtaBand } from "../components/CtaBand";
import { ProductCard } from "../components/ProductCard";
import { ProvaBadge } from "../components/ProvaBadge";
import { TrackedLink } from "../components/TrackedLink";
import { buildMetadata } from "../lib/metadata";
import { coreProducts, nestedProducts } from "../lib/products";

export const metadata: Metadata = buildMetadata({
  title: "Produtos Prova",
  description:
    "Linha Prova da ContextAIQ: Diagnóstico, Conversão, Backoffice, Suporte. Visibilidade (€500) como produto aninhado.",
  path: "/prova",
});

export default function ProvaIndexPage() {
  return (
    <>
      <section className="section-slide pt-10 md:pt-16">
        <div className="container-wide">
          <ProvaBadge className="mb-4">Linha Prova</ProvaBadge>
          <h1 className="mb-5 max-w-3xl">Agentes com unidade de resultado. Não um departamento de IA.</h1>
          <p className="lead max-w-2xl">
            Cada produto Prova ataca um processo. A entrada é o Diagnóstico pago. Conversão é a alavanca
            comercial. Backoffice e Suporte cobrem operações. Visibilidade fica aninhada.
          </p>
        </div>
      </section>

      <section className="section-slide bg-secondary/50">
        <div className="container-wide">
          <div className="grid-2-col">
            {coreProducts.map((product) => (
              <ProductCard key={product.slug} product={product} location="prova_index" />
            ))}
          </div>
        </div>
      </section>

      <section className="section-slide">
        <div className="container-wide">
          {nestedProducts.map((product) => (
            <div key={product.slug} className="card-minimal grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
              <div>
                <ProvaBadge className="mb-3">Produto aninhado</ProvaBadge>
                <h2 className="mb-3 text-2xl">{product.name}</h2>
                <p className="mb-3 text-muted-foreground">{product.summary}</p>
                <p className="text-sm">{product.commercial}</p>
              </div>
              <TrackedLink
                href={product.href}
                className="btn btn-secondary btn-md"
                eventName="cta_click"
                eventParams={{ location: "prova_index", cta: "visibilidade" }}
              >
                Ver Prova Visibilidade
              </TrackedLink>
            </div>
          ))}
        </div>
      </section>

      <CtaBand
        location="prova_final"
        title="Comece pelo Diagnóstico se ainda não há unidade. Vá a Conversão se o funil já dói."
        body="Um processo. Um dono. Um volume mensal. Isso chega para a primeira conversa."
      />
    </>
  );
}
