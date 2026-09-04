import { TrackedLink } from "./components/TrackedLink";

export default function NotFound() {
  return (
    <section className="section-slide pt-10 md:pt-16">
      <div className="container-wide">
        <div className="max-w-2xl">
          <p className="eyebrow mb-4">404</p>
          <h1 className="mb-6">Página inexistente</h1>
          <p className="lead mb-10">Este endereço não existe. Volte ao início ou ao Diagnóstico.</p>
          <div className="flex flex-wrap gap-3">
            <TrackedLink
              href="/"
              className="btn btn-primary btn-sm"
              eventName="cta_click"
              eventParams={{ location: "404", cta: "home" }}
            >
              Início
            </TrackedLink>
            <TrackedLink
              href="/contacto?produto=diagnostico"
              className="btn btn-secondary btn-sm"
              eventName="cta_click"
              eventParams={{ location: "404", cta: "diagnostico" }}
            >
              Agendar Diagnóstico
            </TrackedLink>
          </div>
        </div>
      </div>
    </section>
  );
}
