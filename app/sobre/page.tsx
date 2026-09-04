import type { Metadata } from "next";

import { CtaBand } from "../components/CtaBand";
import { buildMetadata } from "../lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Sobre",
  description:
    "A ContextAIQ é a prática que vende produtos Prova: agentes de IA práticos para PME portuguesas, com honorários híbridos.",
  path: "/sobre",
});

export default function SobrePage() {
  return (
    <>
      <section className="section-slide pt-10 md:pt-16">
        <div className="container-wide">
          <p className="eyebrow mb-4">Sobre</p>
          <h1 className="mb-5 max-w-3xl">Prática ContextAIQ. Produtos Prova. Sem teatro.</h1>
          <p className="lead max-w-2xl">
            Vendemos agentes em produção, num processo, com unidade de resultado. A marca da prática é
            ContextAIQ. A linha de produtos é Prova. O trabalho é em Portugal, com entrega remota.
          </p>
        </div>
      </section>

      <section className="section-slide bg-secondary/50">
        <div className="container-wide">
          <div className="grid-2-col">
            <div>
              <h2 className="mb-4">O que isto é</h2>
              <p className="mb-4 text-muted-foreground">
                Uma prática comercial. Não um laboratório. Não um estúdio de workshops. O objectivo de
                um engagement é um agente a produzir unidades (conversões, ciclos, tickets), com setup
                e sucesso.
              </p>
              <p className="text-muted-foreground">
                A visibilidade em respostas de IA (ChatGPT e pares) existe como Prova Visibilidade,
                produto aninhado a €500. Não define a prática.
              </p>
            </div>
            <div className="card-minimal">
              <h3 className="mb-3">Regras de operação</h3>
              <ul className="list-check text-muted-foreground">
                <li>Sem diagnóstico gratuito.</li>
                <li>Sem clientes ou depoimentos inventados.</li>
                <li>Sem nomes de pessoas na frente da marca.</li>
                <li>Um processo de cada vez.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <CtaBand
        location="sobre_final"
        title="Se tem um processo com volume, o Diagnóstico é o sítio certo."
        body="Respondemos em um dia útil. Honorário do Diagnóstico fechado na primeira troca."
      />
    </>
  );
}
