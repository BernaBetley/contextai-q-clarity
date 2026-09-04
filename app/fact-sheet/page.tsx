import type { Metadata } from "next";

import { buildMetadata } from "../lib/metadata";
import { products } from "../lib/products";
import { siteConfig } from "../lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Fact sheet",
  description: "Factos canónicos sobre a ContextAIQ e a linha Prova, para citação.",
  path: "/fact-sheet",
});

export default function FactSheetPage() {
  return (
    <section className="section-slide pt-10 md:pt-16">
      <div className="container-wide">
        <div className="max-w-3xl">
          <p className="eyebrow mb-4">Fact sheet</p>
          <h1 className="mb-6">ContextAIQ</h1>
          <p className="mb-12 text-muted-foreground">Factos para citação. Sem linguagem de campanha.</p>
          <div className="space-y-12">
            <div>
              <h2 className="mb-4 text-2xl">Organização</h2>
              <dl className="space-y-4">
                <div>
                  <dt className="font-medium">Marca da prática</dt>
                  <dd className="text-muted-foreground">ContextAIQ</dd>
                </div>
                <div>
                  <dt className="font-medium">Linha de produtos</dt>
                  <dd className="text-muted-foreground">Prova</dd>
                </div>
                <div>
                  <dt className="font-medium">Entidade</dt>
                  <dd className="text-muted-foreground">{siteConfig.legalEntity}</dd>
                </div>
                <div>
                  <dt className="font-medium">Site</dt>
                  <dd className="text-muted-foreground">https://www.contextaiq.com</dd>
                </div>
                <div>
                  <dt className="font-medium">Email</dt>
                  <dd className="text-muted-foreground">{siteConfig.contactEmail}</dd>
                </div>
                <div>
                  <dt className="font-medium">Mercado</dt>
                  <dd className="text-muted-foreground">PME em Portugal. Entrega remota.</dd>
                </div>
              </dl>
            </div>
            <div>
              <h2 className="mb-4 text-2xl">Oferta</h2>
              <p className="mb-6 text-muted-foreground">
                Agentes de IA práticos num único processo, com resultados medidos e honorários híbridos
                (setup + sucesso). Diagnóstico pago. Sem consultoria estratégica gratuita.
              </p>
              <ul className="space-y-3 text-muted-foreground">
                {products.map((product) => (
                  <li key={product.slug}>
                    <span className="font-medium text-foreground">{product.name}. </span>
                    {product.commercial}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="mb-4 text-2xl">URLs</h2>
              <ul className="space-y-2 font-mono text-sm text-muted-foreground">
                <li>https://www.contextaiq.com/</li>
                <li>https://www.contextaiq.com/prova</li>
                <li>https://www.contextaiq.com/prova/diagnostico</li>
                <li>https://www.contextaiq.com/prova/conversao</li>
                <li>https://www.contextaiq.com/prova/visibilidade</li>
                <li>https://www.contextaiq.com/metodo</li>
                <li>https://www.contextaiq.com/contacto</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
