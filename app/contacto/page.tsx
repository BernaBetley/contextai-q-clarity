import type { Metadata } from "next";
import { Calendar, Mail } from "lucide-react";

import { ContactForm } from "../components/ContactForm";
import { TrackedLink } from "../components/TrackedLink";
import { env } from "../lib/env.server";
import { buildMetadata } from "../lib/metadata";
import { getProduct, type ProductSlug } from "../lib/products";

export const metadata: Metadata = buildMetadata({
  title: "Contacto",
  description:
    "Agendar Prova Diagnóstico: nome, empresa, email, processo e volume. Resposta em um dia útil.",
  path: "/contacto",
});

type Props = { searchParams?: { produto?: string } };

export default function ContactoPage({ searchParams }: Props) {
  const calendlyUrl = env.NEXT_PUBLIC_CALENDLY_URL;
  const requested = searchParams?.produto;
  const product = requested ? getProduct(requested) : undefined;
  const defaultProcess = (product?.slug ?? "diagnostico") as ProductSlug;

  return (
    <>
      <section className="section-slide pt-10 md:pt-16">
        <div className="container-wide">
          <p className="eyebrow mb-4">Contacto</p>
          <h1 className="mb-5 max-w-3xl">Traga um processo e um volume. Nós fechamos o âmbito.</h1>
          <p className="lead max-w-2xl">
            {product
              ? `Pedido centrado em ${product.name}. Diagnóstico continua a ser pago. Sem sessão exploratória gratuita.`
              : "Formulário para Prova Diagnóstico (ou outro produto, se já souber o processo). Resposta em um dia útil."}
          </p>
        </div>
      </section>

      <section className="section-slide">
        <div className="container-wide">
          <div className="grid-2-col items-start">
            <div className="card-minimal">
              <h2 className="mb-6 text-2xl">Pedir Diagnóstico</h2>
              <ContactForm defaultProcess={defaultProcess} />
            </div>

            <div className="space-y-6">
              <div className="card-minimal">
                <div className="flex gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-sm bg-secondary">
                    <Calendar size={20} />
                  </div>
                  <div>
                    <h3 className="mb-2 text-lg">Calendário</h3>
                    <p className="mb-4 text-muted-foreground">
                      Se preferir um slot de 20 minutos para confirmar processo e volume.
                    </p>
                    {calendlyUrl ? (
                      <TrackedLink
                        href={calendlyUrl}
                        external
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-secondary btn-sm"
                        eventName="cta_click"
                        eventParams={{ location: "contacto_calendario", cta: "calendly" }}
                      >
                        Abrir calendário
                      </TrackedLink>
                    ) : (
                      <TrackedLink
                        href="mailto:hello@contextaiq.com?subject=Pedido%20de%20chamada%20(Prova%20Diagnostico)"
                        external
                        className="btn btn-secondary btn-sm"
                        eventName="cta_click"
                        eventParams={{ location: "contacto_calendario", cta: "email_call" }}
                      >
                        Pedir chamada por email
                      </TrackedLink>
                    )}
                  </div>
                </div>
              </div>

              <div className="card-ink">
                <h3 className="mb-2 text-lg text-paper">O que não precisa de trazer</h3>
                <p className="text-sm text-paper/80">
                  Não pedimos um RFP de IA. Pedimos o fluxo que dói e um número (leads, tickets,
                  documentos). Se só quiser a auditoria de visibilidade, vá a Prova Visibilidade (€500).
                </p>
                <TrackedLink
                  href="/prova/visibilidade"
                  className="btn btn-sm mt-5 border border-copper-bright text-paper hover:bg-copper"
                  eventName="cta_click"
                  eventParams={{ location: "contacto_visibilidade", cta: "visibilidade" }}
                >
                  Ver Prova Visibilidade
                </TrackedLink>
              </div>

              <div className="card-minimal">
                <div className="flex gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-sm bg-secondary">
                    <Mail size={20} />
                  </div>
                  <div>
                    <h3 className="mb-2 text-lg">Email directo</h3>
                    <TrackedLink
                      href="mailto:hello@contextaiq.com"
                      external
                      className="btn btn-secondary btn-sm"
                      eventName="cta_click"
                      eventParams={{ location: "contacto_email", cta: "hello" }}
                    >
                      hello@contextaiq.com
                    </TrackedLink>
                    <p className="mt-3 text-small">Para factura: envie entidade e NIF.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
