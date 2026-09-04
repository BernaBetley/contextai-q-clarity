import type { Metadata } from "next";

import { CtaBand } from "../components/CtaBand";
import { buildMetadata } from "../lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Método",
  description:
    "Como a ContextAIQ coloca um agente Prova em produção: diagnóstico pago, baseline, um processo, setup + sucesso.",
  path: "/metodo",
});

const steps = [
  {
    number: "01",
    title: "Qualificação dura",
    body: "Processo, dono, volume, ferramenta. Se isto não existir, não marcamos Diagnóstico. Recusamos 'vamos explorar juntos' a custo zero.",
  },
  {
    number: "02",
    title: "Prova Diagnóstico (pago)",
    body: "Âmbito: um fluxo. Entrega: mapa, unidade de resultado, gaps de dados, proposta de produto Prova e lógica de honorários.",
  },
  {
    number: "03",
    title: "Baseline",
    body: "Período de referência, fonte, filtros. Sem baseline não há taxa de sucesso. Pode haver só setup, ou paragem.",
  },
  {
    number: "04",
    title: "Agente num processo",
    body: "30-90 dias até produção. Critério de aceitação. Escalamento humano escrito. Nada de plataforma 'para toda a empresa'.",
  },
  {
    number: "05",
    title: "Medição e sucesso",
    body: "Relatório da unidade. Facturação do incremental. Tecto e período. Ajuste de prompts e regras, não um novo projecto.",
  },
];

export default function MetodoPage() {
  return (
    <>
      <section className="section-slide pt-10 md:pt-16">
        <div className="container-wide">
          <p className="eyebrow mb-4">Método</p>
          <h1 className="mb-5 max-w-3xl">Um processo. Uma unidade. Pele no jogo.</h1>
          <p className="lead max-w-2xl">
            A prática não vende um departamento de IA. Vende um agente a trabalhar, com número. O método
            existe para recusar teatro e para o sucesso ser facturável sem discussão de café.
          </p>
        </div>
      </section>

      <section className="section-slide bg-secondary/50">
        <div className="container-wide max-w-4xl space-y-5">
          {steps.map((step) => (
            <div key={step.number} className="card-minimal grid gap-4 md:grid-cols-[5rem_1fr] md:items-start">
              <p className="font-serif text-3xl text-copper">{step.number}</p>
              <div>
                <h2 className="mb-2 text-2xl">{step.title}</h2>
                <p className="text-muted-foreground">{step.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section-slide">
        <div className="container-wide">
          <p className="eyebrow mb-3">Contraste de mercado</p>
          <h2 className="mb-6 max-w-3xl">Consultoria grátis e fee fixo sem unidade não são o nosso ofício.</h2>
          <div className="grid-2-col">
            <div className="card-minimal">
              <h3 className="mb-3">O padrão que vemos</h3>
              <p className="text-muted-foreground">
                Sessão gratuita, dossier de incentivos, projecto fechado em dias-homem. Útil para quem
                quer slides. Frágil para quem precisa de reuniões, facturas ou tickets no fim do mês.
              </p>
            </div>
            <div className="card-minimal">
              <h3 className="mb-3">A cunha ContextAIQ</h3>
              <p className="text-muted-foreground">
                Diagnóstico pago. Setup. Sucesso sobre incremental. Se a unidade não for mensurável,
                não vendemos o agente. Preferimos um 'não' cedo a um retainer de oito meses.
              </p>
            </div>
          </div>
        </div>
      </section>

      <CtaBand
        location="metodo_final"
        title="Se já tem o processo e o volume, o Diagnóstico é o passo seguinte."
        body="Se o que precisa é só de um score em ChatGPT, Claude, Gemini e Perplexity, use Prova Visibilidade (€500)."
      />
    </>
  );
}
