import type { Metadata } from "next";

import { buildMetadata } from "../lib/metadata";
import { siteConfig } from "../lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Privacidade",
  description: "Política de privacidade da ContextAIQ.",
  path: "/privacidade",
});

export default function PrivacidadePage() {
  return (
    <section className="section-slide pt-10 md:pt-16">
      <div className="container-wide">
        <div className="max-w-3xl">
          <p className="eyebrow mb-4">Legal</p>
          <h1 className="mb-6">Privacidade</h1>
          <p className="mb-10 text-muted-foreground">
            O que recolhemos, para quê, e como pedir alteração ou apagamento.
          </p>
          <div className="space-y-10">
            <div>
              <h2 className="mb-3 text-2xl">Dados</h2>
              <p className="text-muted-foreground">
                Recolhemos o que envia no formulário (nome, email, empresa, processo, volume, mensagem).
                Se a analytics estiver activa, registamos páginas e cliques para perceber o site.
              </p>
            </div>
            <div>
              <h2 className="mb-3 text-2xl">Uso</h2>
              <ul className="space-y-2 text-muted-foreground">
                <li>Responder a pedidos e prestar os serviços Prova.</li>
                <li>Operar e melhorar o site.</li>
                <li>Medir desempenho de marketing, quando a analytics está ligada.</li>
              </ul>
            </div>
            <div>
              <h2 className="mb-3 text-2xl">Partilha</h2>
              <p className="text-muted-foreground">
                Não vendemos dados. Podemos usar processadores necessários (formulário, pagamento Stripe
                na Visibilidade, analytics). O responsável operacional da prática é {siteConfig.legalEntity}.
              </p>
            </div>
            <div>
              <h2 className="mb-3 text-2xl">Direitos</h2>
              <p className="text-muted-foreground">
                Acesso, correcção e apagamento:{" "}
                <a className="text-foreground underline underline-offset-4" href="mailto:hello@contextaiq.com">
                  hello@contextaiq.com
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
