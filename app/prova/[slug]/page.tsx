import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowRight, Check } from "lucide-react";

import { CtaPair } from "../../components/CtaBand";
import { FaqSchema, ServiceSchema } from "../../components/StructuredData";
import { ProvaBadge } from "../../components/ProvaBadge";
import { TrackedLink } from "../../components/TrackedLink";
import { env } from "../../lib/env.server";
import { buildMetadata } from "../../lib/metadata";
import { getProduct, products, type ProductSlug } from "../../lib/products";

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const product = getProduct(params.slug);
  if (!product) return {};
  return buildMetadata({
    title: product.name,
    description: product.summary,
    path: product.href,
  });
}

const conversaoFaqs = [
  {
    question: "O que é uma conversão incremental?",
    answer:
      "A unidade acima do baseline, no mesmo canal e critério. Se o baseline era 20 reuniões/mês no inbound, a 21.ª no mesmo critério entra na taxa. O volume pré-existente não é facturado como sucesso.",
  },
  {
    question: "Como se fixa o baseline?",
    answer:
      "Com dados do período de referência (em regra 4-8 semanas, ou o histórico fiável que tiverem). Fonte, filtro e excepções ficam no contrato. Sem baseline, não há taxa de sucesso. Há só setup, ou não avançamos.",
  },
  {
    question: "Qual é a grelha de taxa?",
    answer:
      "Fecha-se no Diagnóstico. Lógica: a taxa é uma fracção do valor económico da unidade (reunião, pedido, encomenda). Há tecto por ciclo. Publicar um € inventado aqui seria teatro. A grelha ilustrativa abaixo mostra a forma, não um caso real.",
  },
  {
    question: "Podemos ir directo a Conversão sem Diagnóstico?",
    answer:
      "Só se o processo, o volume e a fonte de dados já estiverem claros na primeira conversa. Caso contrário, o Diagnóstico é a entrada. Não fazemos scoping gratuito.",
  },
];

function RateTable() {
  return (
    <div className="overflow-x-auto card-minimal">
      <table className="w-full min-w-[36rem] text-left text-sm">
        <caption className="mb-4 text-left text-small">
          Grelha ilustrativa de lógica de taxa. Não é resultado de cliente. Valores fecham-se no Diagnóstico.
        </caption>
        <thead>
          <tr className="border-b border-border">
            <th className="py-3 pr-4 font-semibold">Unidade</th>
            <th className="py-3 pr-4 font-semibold">Baseline</th>
            <th className="py-3 pr-4 font-semibold">Sucesso (forma)</th>
            <th className="py-3 font-semibold">Notas</th>
          </tr>
        </thead>
        <tbody className="text-muted-foreground">
          <tr className="border-b border-border">
            <td className="py-3 pr-4 text-foreground">Lead → reunião válida</td>
            <td className="py-3 pr-4">Reuniões/mês no canal, 4-8 semanas</td>
            <td className="py-3 pr-4">€ / reunião incremental</td>
            <td className="py-3">Critério de 'válida' escrito (duração, dono, no-show).</td>
          </tr>
          <tr className="border-b border-border">
            <td className="py-3 pr-4 text-foreground">Visita → pedido / orçamento</td>
            <td className="py-3 pr-4">Pedidos/mês no mesmo formulário ou canal</td>
            <td className="py-3 pr-4">€ / pedido incremental</td>
            <td className="py-3">Exclui spam e duplicados.</td>
          </tr>
          <tr>
            <td className="py-3 pr-4 text-foreground">Pedido → encomenda</td>
            <td className="py-3 pr-4">Taxa de fecho e valor médio</td>
            <td className="py-3 pr-4">% do valor incremental ou € / encomenda</td>
            <td className="py-3">Tecto por ciclo. Sem double-count com a unidade a montante.</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

function VisibilidadeCheckout() {
  const stripeCheckoutUrl = env.NEXT_PUBLIC_STRIPE_CHECKOUT_URL;
  const intakeUrl = env.NEXT_PUBLIC_AUDIT_INTAKE_URL;

  return (
    <div className="space-y-8">
      <div className="flex items-baseline gap-3">
        <span className="font-serif text-5xl font-semibold">€500</span>
        <span className="text-muted-foreground">pagamento único · 5-7 dias úteis</span>
      </div>
      {stripeCheckoutUrl ? (
        <TrackedLink
          href={stripeCheckoutUrl}
          external
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary btn-lg"
          eventName="cta_click"
          eventParams={{ location: "visibilidade_hero", cta: "Comprar Prova Visibilidade" }}
        >
          Comprar Prova Visibilidade <ArrowRight size={18} />
        </TrackedLink>
      ) : (
        <TrackedLink
          href="/contacto?produto=visibilidade"
          className="btn btn-primary btn-lg"
          eventName="cta_click"
          eventParams={{ location: "visibilidade_hero", cta: "Pedir factura Visibilidade" }}
        >
          Pedir factura / transferência <ArrowRight size={18} />
        </TrackedLink>
      )}
      <p className="text-small">Pagamento Stripe. Factura emitida. Isto não substitui um agente em produção.</p>
      {intakeUrl ? (
        <p className="text-small">
          Após compra:{" "}
          <TrackedLink
            href={intakeUrl}
            external
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4"
            eventName="cta_click"
            eventParams={{ location: "visibilidade_intake", cta: "Intake" }}
          >
            formulário de intake
          </TrackedLink>
          .
        </p>
      ) : (
        <p className="text-small">
          O link de intake vai no email de confirmação. Se não chegar, escreva para hello@contextaiq.com.
        </p>
      )}
    </div>
  );
}

export default function ProductPage({ params }: Props) {
  const product = getProduct(params.slug);
  if (!product) notFound();

  const isVisibilidade = product.slug === "visibilidade";
  const isConversao = product.slug === "conversao";
  const isDiagnostico = product.slug === "diagnostico";
  const contactHref = `/contacto?produto=${product.slug as ProductSlug}`;

  return (
    <>
      <ServiceSchema
        name={product.name}
        description={product.summary}
        price={isVisibilidade ? "500" : undefined}
        url={product.href}
      />
      {isConversao ? <FaqSchema items={conversaoFaqs} /> : null}

      <section className="section-slide pt-10 md:pt-16">
        <div className="container-wide">
          <div className="grid items-start gap-10 lg:grid-cols-2">
            <div>
              <ProvaBadge className="mb-4">{product.eyebrow}</ProvaBadge>
              <h1 className="mb-5">{product.name}</h1>
              <p className="lead mb-6">{product.promise}</p>
              <p className="mb-8 text-muted-foreground">{product.summary}</p>
              {isVisibilidade ? (
                <VisibilidadeCheckout />
              ) : (
                <div className="flex flex-wrap gap-3">
                  <TrackedLink
                    href={contactHref}
                    className="btn btn-primary btn-lg"
                    eventName="cta_click"
                    eventParams={{ location: `${product.slug}_hero`, cta: "contacto" }}
                  >
                    {isDiagnostico ? "Agendar Prova Diagnóstico" : `Falar de ${product.shortName}`}{" "}
                    <ArrowRight size={18} />
                  </TrackedLink>
                  {!isDiagnostico ? (
                    <TrackedLink
                      href="/contacto?produto=diagnostico"
                      className="btn btn-secondary btn-lg"
                      eventName="cta_click"
                      eventParams={{ location: `${product.slug}_hero`, cta: "diagnostico" }}
                    >
                      Ou começar pelo Diagnóstico
                    </TrackedLink>
                  ) : (
                    <TrackedLink
                      href="/prova/conversao"
                      className="btn btn-secondary btn-lg"
                      eventName="cta_click"
                      eventParams={{ location: "diagnostico_hero", cta: "conversao" }}
                    >
                      Ver Prova Conversão
                    </TrackedLink>
                  )}
                </div>
              )}
            </div>
            <div className="card-minimal">
              <h2 className="mb-4 text-lg">O que fica entregue</h2>
              <ul className="space-y-3">
                {product.outcomes.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Check size={18} className="mt-0.5 shrink-0 text-copper" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm">
                <span className="font-medium">Comercial: </span>
                {product.commercial}
              </p>
            </div>
          </div>
        </div>
      </section>

      {isConversao ? (
        <section className="section-slide bg-secondary/50">
          <div className="container-wide">
            <p className="eyebrow mb-3">Lógica de taxa</p>
            <h2 className="mb-4 max-w-3xl">Baseline primeiro. Incremental a seguir. Tecto no contrato.</h2>
            <p className="lead mb-10 max-w-2xl">
              Setup cobre a entrada em produção no funil. A taxa de sucesso só corre sobre o que o
              agente acrescenta. Sem baseline escrito, não há sucesso a facturar.
            </p>
            <RateTable />
          </div>
        </section>
      ) : null}

      {isDiagnostico ? (
        <section className="section-slide bg-secondary/50">
          <div className="container-wide">
            <p className="eyebrow mb-3">Entrada paga</p>
            <h2 className="mb-4 max-w-3xl">Um processo. Não um inventário da empresa.</h2>
            <div className="grid-2-col">
              <p className="text-muted-foreground">
                Traga o fluxo que dói (pedidos, facturas, tickets) e o volume mensal. Nós devolvemos a
                unidade de resultado, o que é automatizável, e a proposta Prova (quase sempre Conversão,
                Backoffice ou Suporte). Se o processo não tiver dono ou dados, dizemos que não.
              </p>
              <div className="card-minimal">
                <h3 className="mb-3 text-lg">O que precisa para marcar</h3>
                <ul className="list-check text-muted-foreground">
                  <li>Nome do processo e quem é dono na empresa.</li>
                  <li>Volume mensal aproximado.</li>
                  <li>Ferramenta onde o trabalho vive (email, CRM, ERP, helpdesk).</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      ) : null}

      <section className="section-slide">
        <div className="container-wide">
          <div className="grid-2-col">
            <div>
              <p className="eyebrow mb-3">Limites</p>
              <h2 className="mb-6">O que isto não é</h2>
              <div className="space-y-3">
                {product.notThis.map((item) => (
                  <div key={item} className="card-minimal">
                    <p>{item}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="eyebrow mb-3">Unidade</p>
              <h2 className="mb-6">Como medimos</h2>
              <div className="card-ink">
                <p className="mb-3 text-copper-bright">{product.unit}</p>
                <p className="text-paper/80">{product.commercial}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {isConversao ? (
        <section className="section-slide bg-secondary/50">
          <div className="container-wide">
            <p className="eyebrow mb-3">Perguntas</p>
            <h2 className="mb-10">Conversão, sem teatro</h2>
            <div className="grid-2-col">
              {conversaoFaqs.map((item) => (
                <div key={item.question} className="card-minimal">
                  <h3 className="mb-3 text-lg">{item.question}</h3>
                  <p className="text-sm text-muted-foreground">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="section-slide">
        <div className="container-wide">
          <div className="card-ink">
            <p className="eyebrow mb-3 text-copper-bright">Próximo passo</p>
            <h2 className="mb-4 text-paper">
              {isVisibilidade
                ? "Auditoria €500, ou Diagnóstico se o objectivo é um agente em produção."
                : "Traga processo e volume. Fechamos âmbito na resposta."}
            </h2>
            {isVisibilidade ? (
              <div className="flex flex-wrap gap-3">
                {env.NEXT_PUBLIC_STRIPE_CHECKOUT_URL ? (
                  <TrackedLink
                    href={env.NEXT_PUBLIC_STRIPE_CHECKOUT_URL}
                    external
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-lg border border-copper-bright text-paper hover:bg-copper hover:text-paper"
                    eventName="cta_click"
                    eventParams={{ location: "visibilidade_final", cta: "stripe" }}
                  >
                    Comprar por €500
                  </TrackedLink>
                ) : (
                  <TrackedLink
                    href="/contacto?produto=visibilidade"
                    className="btn btn-lg border border-copper-bright text-paper hover:bg-copper"
                    eventName="cta_click"
                    eventParams={{ location: "visibilidade_final", cta: "contacto" }}
                  >
                    Pedir factura
                  </TrackedLink>
                )}
                <TrackedLink
                  href="/contacto?produto=diagnostico"
                  className="btn btn-lg bg-paper text-ink hover:bg-paper/90"
                  eventName="cta_click"
                  eventParams={{ location: "visibilidade_final", cta: "diagnostico" }}
                >
                  Agendar Diagnóstico
                </TrackedLink>
              </div>
            ) : (
              <CtaPair location={`${product.slug}_final`} />
            )}
          </div>
        </div>
      </section>
    </>
  );
}
