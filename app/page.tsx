import type { Metadata } from "next";
import { ArrowRight, Gauge, Scale, Timer } from "lucide-react";

import { CtaBand, CtaPair } from "./components/CtaBand";
import { FaqSchema, ServiceSchema } from "./components/StructuredData";
import { ProductCard } from "./components/ProductCard";
import { ProvaBadge } from "./components/ProvaBadge";
import { TrackedLink } from "./components/TrackedLink";
import { buildMetadata } from "./lib/metadata";
import { coreProducts, nestedProducts } from "./lib/products";

export const metadata: Metadata = buildMetadata({
  title: "Agentes Prova para PME",
  description:
    "A ContextAIQ vende Prova: um agente de IA num processo da PME, com resultado medido e honorários híbridos (setup + sucesso). Diagnóstico pago. Sem teatro de estratégia gratuita.",
  path: "/",
});

const faqs = [
  {
    question: "Isto é mais um workshop de IA?",
    answer:
      "Não. Não fazemos sessões gratuitas nem roadmaps sem dono. O Diagnóstico é pago. O trabalho seguinte é um agente em produção, num único processo, com unidade de resultado.",
  },
  {
    question: "Já temos ChatGPT na empresa. Chega?",
    answer:
      "Uma licença não é um processo. A maior parte das PME portuguesas já experimentou o chat. Quase nenhuma tem um agente a fechar um fluxo (pedido, factura, ticket) com métrica. Esse é o salto de 30-90 dias.",
  },
  {
    question: "Como cobram?",
    answer:
      "Híbrido. Setup para pôr o agente a trabalhar. Sucesso sobre unidades incrementais (conversão, ciclo, ticket) contra um baseline escrito. Sem retainer opaco.",
  },
  {
    question: "Quanto custa o Diagnóstico?",
    answer:
      "É um honorário fixo, fechado na primeira conversa, em função do processo e dos dados disponíveis. Não é zero. Se o objectivo for só visibilidade em respostas de IA, existe Prova Visibilidade a €500.",
  },
  {
    question: "Têm casos de clientes publicados?",
    answer:
      "Não inventamos logótipos nem depoimentos. A prova que mostramos é o método: baseline, unidade, período, tecto. Resultados concretos ficam no contrato de cada processo.",
  },
  {
    question: "E a auditoria de visibilidade em ChatGPT?",
    answer:
      "Continua a existir como Prova Visibilidade (€500, âmbito fixo). É um produto aninhado, não o centro da prática.",
  },
];

export default function HomePage() {
  return (
    <>
      <ServiceSchema
        name="Prova Diagnóstico"
        description="Diagnóstico pago de um processo da PME, com unidade de resultado e proposta de agente Prova."
        url="/prova/diagnostico"
      />
      <FaqSchema items={faqs} />

      <section className="section-slide pt-10 md:pt-16">
        <div className="container-wide">
          <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
            <div>
              <p className="eyebrow mb-4">ContextAIQ · produtos Prova</p>
              <h1 className="mb-5 max-w-3xl text-balance">
                Um processo. Um agente em produção. Resultado medido.
              </h1>
              <p className="lead mb-6 max-w-2xl">
                Vendemos Prova: agentes práticos para PME portuguesas. Setup mais sucesso sobre unidades
                (conversão, ciclo, ticket). Diagnóstico pago. Recusamos estratégia gratuita.
              </p>
              <CtaPair location="home_hero" />
              <ul className="list-check mt-8 max-w-2xl text-muted-foreground">
                <li>Do ChatGPT licenciado a um agente num fluxo, em 30-90 dias.</li>
                <li>Honorários com pele no jogo. Não cobramos o que já convertiam sem nós.</li>
                <li>Um processo de cada vez. Dono, volume e métrica à partida.</li>
              </ul>
            </div>

            <aside className="card-ink">
              <p className="eyebrow mb-3 text-copper-bright">Mercado, não hype</p>
              <p className="mb-5 font-serif text-2xl leading-snug text-paper">
                Adoção de IA nas PME em Portugal ronda 11,5%. Na UE, cerca de 20%.
              </p>
              <p className="mb-6 text-sm leading-relaxed text-paper/75">
                O fosso não é o modelo. É pôr um agente a trabalhar num processo com dono. O ponto doce:
                empresas que já pagam ChatGPT e ainda não têm uma unidade de resultado em produção.
              </p>
              <dl className="space-y-4 border-t border-paper/15 pt-5 text-sm">
                <div>
                  <dt className="text-copper-bright">Unidade</dt>
                  <dd className="text-paper/90">Conversão, ciclo ou ticket. Acordada por escrito.</dd>
                </div>
                <div>
                  <dt className="text-copper-bright">Prazo típico</dt>
                  <dd className="text-paper/90">30-90 dias até produção num processo.</dd>
                </div>
                <div>
                  <dt className="text-copper-bright">Comercial</dt>
                  <dd className="text-paper/90">Setup + sucesso. Diagnóstico nunca é zero.</dd>
                </div>
              </dl>
            </aside>
          </div>
        </div>
      </section>

      <section className="section-slide bg-secondary/50">
        <div className="container-wide">
          <p className="eyebrow mb-3">O problema</p>
          <h2 className="mb-4 max-w-3xl">A licença não fecha o mês</h2>
          <p className="lead mb-10 max-w-2xl">
            Gerentes e donos de PME já viram demos. O que falta é um fluxo concreto a produzir mais
            reuniões, menos retrabalho ou tickets resolvidos, com número.
          </p>
          <div className="grid-3-col">
            {[
              {
                title: "Chat sem processo",
                body: "A equipa cola texto no ChatGPT. O CRM, o email e o helpdesk continuam iguais. Não há baseline nem dono.",
              },
              {
                title: "Teatro de estratégia",
                body: "Workshops grátis, candidaturas a fundos, fees fixos sem unidade. Muito slide. Pouca produção.",
              },
              {
                title: "Medo de 'projecto de IA'",
                body: "Nove meses, cinco sistemas, zero métrica. Nós recusamos esse formato. Um processo. Um agente.",
              },
            ].map((item) => (
              <div key={item.title} className="card-minimal">
                <h3 className="mb-3">{item.title}</h3>
                <p className="text-muted-foreground">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-slide" id="prova">
        <div className="container-wide">
          <p className="eyebrow mb-3">Linha Prova</p>
          <h2 className="mb-3 max-w-3xl">Quatro ofertas de produção. Uma auditoria aninhada.</h2>
          <p className="lead mb-10 max-w-2xl">
            Diagnóstico é a entrada. Conversão é a alavanca comercial. Backoffice e Suporte cobrem
            operações. Visibilidade (€500) existe para quem precisa de um score em respostas de IA.
          </p>
          <div className="grid-2-col">
            {coreProducts.map((product) => (
              <ProductCard key={product.slug} product={product} location="home_products" />
            ))}
          </div>
          <div className="mt-6">
            {nestedProducts.map((product) => (
              <div key={product.slug} className="card-minimal flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <ProvaBadge className="mb-3">Prova Visibilidade</ProvaBadge>
                  <h3 className="mb-2">{product.name}</h3>
                  <p className="text-muted-foreground">{product.summary}</p>
                </div>
                <TrackedLink
                  href={product.href}
                  className="btn btn-secondary btn-md shrink-0"
                  eventName="cta_click"
                  eventParams={{ location: "home_visibilidade", cta: "Prova Visibilidade" }}
                >
                  {product.priceNote} · ver auditoria <ArrowRight size={16} />
                </TrackedLink>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-slide bg-secondary/50">
        <div className="container-wide">
          <p className="eyebrow mb-3">Como trabalhamos</p>
          <h2 className="mb-10 max-w-2xl">Três passos. Sem fase de 'descoberta eterna'.</h2>
          <div className="grid-3-col">
            {[
              {
                icon: Gauge,
                step: "01",
                title: "Diagnóstico pago",
                body: "Um processo, volume, dono, dados. Entrega: unidade de resultado e proposta Prova. Se não houver processo, paramos aqui.",
              },
              {
                icon: Timer,
                step: "02",
                title: "Agente em 30-90 dias",
                body: "Integração no fluxo que já existe. Critério de aceitação. Baseline escrito antes de ligar o sucesso.",
              },
              {
                icon: Scale,
                step: "03",
                title: "Setup + sucesso",
                body: "Setup cobre a entrada em produção. Sucesso cobra só o incremental. Tecto e período no contrato.",
              },
            ].map((item) => (
              <div key={item.step} className="card-minimal">
                <item.icon className="mb-4 text-copper" size={22} />
                <p className="mb-2 font-serif text-2xl text-copper">{item.step}</p>
                <h3 className="mb-3">{item.title}</h3>
                <p className="text-muted-foreground">{item.body}</p>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <TrackedLink
              href="/metodo"
              className="btn btn-secondary btn-md"
              eventName="cta_click"
              eventParams={{ location: "home_method", cta: "Ver método" }}
            >
              Ver o método completo
            </TrackedLink>
          </div>
        </div>
      </section>

      <section className="section-slide">
        <div className="container-wide">
          <p className="eyebrow mb-3">Modelo comercial</p>
          <h2 className="mb-4 max-w-3xl">Pele no jogo. Unidades, não horas de teatro.</h2>
          <p className="lead mb-10 max-w-2xl">
            O mercado vende consultorias grátis, fees fixos e dossiers de financiamento. A nossa cunha
            é outra: medimos, cobramos o incremental, recusamos o resto.
          </p>
          <div className="grid-2-col">
            <div className="card-minimal">
              <h3 className="mb-3">O que cobramos</h3>
              <ul className="list-check text-muted-foreground">
                <li>Diagnóstico: honorário fixo. Entrada obrigatória, excepto Visibilidade €500.</li>
                <li>Setup: pôr o agente a trabalhar num processo.</li>
                <li>Sucesso: € por unidade incremental vs baseline, ou fracção do valor económico.</li>
              </ul>
            </div>
            <div className="card-minimal">
              <h3 className="mb-3">O que recusamos</h3>
              <ul className="list-check text-muted-foreground">
                <li>Diagnóstico a custo zero para 'explorar o problema'.</li>
                <li>Retainer mensal sem unidade visível no relatório.</li>
                <li>Cobrar o volume que a PME já tinha antes do agente.</li>
              </ul>
            </div>
          </div>
          <p className="mt-6 text-small">
            Grelhas de taxa (Conversão, Backoffice, Suporte) fecham-se no Diagnóstico. Não publicamos
            preços inventados nem resultados de clientes fictícios.
          </p>
        </div>
      </section>

      <section className="section-slide bg-secondary/50">
        <div className="container-wide">
          <p className="eyebrow mb-3">Disciplina, não depoimentos inventados</p>
          <h2 className="mb-4 max-w-3xl">A prova é o contrato de medição.</h2>
          <p className="lead mb-10 max-w-2xl">
            Sem logótipos de clientes. Sem quotes. O que pode inspeccionar hoje: método, unidade, baseline.
          </p>
          <div className="overflow-x-auto card-minimal">
            <table className="w-full min-w-[32rem] text-left text-sm">
              <caption className="mb-4 text-left text-small">
                Exemplo ilustrativo de grelha (não é resultado de um cliente).
              </caption>
              <thead>
                <tr className="border-b border-border">
                  <th className="py-3 pr-4 font-semibold">Peça</th>
                  <th className="py-3 pr-4 font-semibold">O que fica escrito</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b border-border">
                  <td className="py-3 pr-4 text-foreground">Baseline</td>
                  <td className="py-3 pr-4">Taxa e volume do período de referência, fonte dos dados.</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-3 pr-4 text-foreground">Unidade</td>
                  <td className="py-3 pr-4">Reunião, pedido, factura aceite, ticket fechado sem reabertura.</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-3 pr-4 text-foreground">Incremental</td>
                  <td className="py-3 pr-4">Só o que excede o baseline no mesmo canal e critério.</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 text-foreground">Tecto e período</td>
                  <td className="py-3 pr-4">Duração da taxa de sucesso e máximo a pagar no ciclo.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="section-slide">
        <div className="container-wide">
          <p className="eyebrow mb-3">Perguntas</p>
          <h2 className="mb-10 max-w-2xl">O que um GM pergunta antes de marcar.</h2>
          <div className="grid-2-col">
            {faqs.map((item) => (
              <div key={item.question} className="card-minimal">
                <h3 className="mb-3 text-lg">{item.question}</h3>
                <p className="text-sm text-muted-foreground">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        location="home_final"
        title="Marque o Diagnóstico. Traga um processo e um número de volume."
        body="Respondemos em um dia útil com âmbito e honorário. Se o processo não tiver unidade, dizemos que não. Sem workshop grátis."
      />
    </>
  );
}
