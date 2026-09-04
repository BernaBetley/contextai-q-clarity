import type { Metadata } from "next";

import { buildMetadata } from "../lib/metadata";
import { siteConfig } from "../lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Termos",
  description: "Termos de utilização do site ContextAIQ e dos produtos Prova.",
  path: "/termos",
});

export default function TermosPage() {
  return (
    <section className="section-slide pt-10 md:pt-16">
      <div className="container-wide">
        <div className="max-w-3xl">
          <p className="eyebrow mb-4">Legal</p>
          <h1 className="mb-6">Termos</h1>
          <p className="mb-10 text-muted-foreground">
            Estes termos cobrem o uso deste site e, em traços gerais, os serviços Prova. O contrato
            escrito de cada engagement prevalece.
          </p>
          <div className="space-y-10">
            <div>
              <h2 className="mb-3 text-2xl">Marca e entidade</h2>
              <p className="text-muted-foreground">
                ContextAIQ é a marca da prática. A linha de produtos chama-se Prova. A entidade por
                trás do site é {siteConfig.legalEntity}.
              </p>
            </div>
            <div>
              <h2 className="mb-3 text-2xl">Serviços</h2>
              <p className="text-muted-foreground">
                Âmbito, prazos e unidades de resultado ficam nas páginas de produto e no acordo
                escrito. Diagnóstico é pago. Conversão, Backoffice e Suporte usam setup + sucesso.
                Visibilidade tem preço fixo de €500.
              </p>
            </div>
            <div>
              <h2 className="mb-3 text-2xl">Pagamentos</h2>
              <p className="text-muted-foreground">
                A compra de Prova Visibilidade pode ser processada por Stripe. Factura ou
                transferência: hello@contextaiq.com.
              </p>
            </div>
            <div>
              <h2 className="mb-3 text-2xl">Limitação</h2>
              <p className="text-muted-foreground">
                O comportamento de modelos de IA muda. Resultados variam com dados, processo e
                disciplina de uso. Na medida permitida pela lei, {siteConfig.name} e{" "}
                {siteConfig.legalEntity} não respondem por danos indirectos decorrentes do uso deste site.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
