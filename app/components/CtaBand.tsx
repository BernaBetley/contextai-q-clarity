import { ArrowRight } from "lucide-react";

import { primaryCta, secondaryCta } from "../lib/nav";
import { TrackedLink } from "./TrackedLink";

export function CtaPair({
  location,
  invert = false,
}: {
  location: string;
  invert?: boolean;
}) {
  const primaryClass = invert
    ? "btn btn-lg bg-paper text-ink hover:bg-paper/90"
    : "btn btn-primary btn-lg";
  const secondaryClass = invert
    ? "btn btn-lg border border-copper-bright text-paper hover:bg-copper hover:text-paper"
    : "btn btn-secondary btn-lg";

  return (
    <div className="flex flex-wrap gap-3">
      <TrackedLink
        href={primaryCta.href}
        className={primaryClass}
        eventName="cta_click"
        eventParams={{ location, cta: primaryCta.label }}
      >
        {primaryCta.label} <ArrowRight size={18} />
      </TrackedLink>
      <TrackedLink
        href={secondaryCta.href}
        className={secondaryClass}
        eventName="cta_click"
        eventParams={{ location, cta: secondaryCta.label }}
      >
        {secondaryCta.label}
      </TrackedLink>
    </div>
  );
}

export function CtaBand({
  location,
  title,
  body,
}: {
  location: string;
  title: string;
  body: string;
}) {
  return (
    <section className="section-slide">
      <div className="container-wide">
        <div className="card-ink">
          <p className="eyebrow mb-3 text-copper-bright">Próximo passo</p>
          <h2 className="mb-4 max-w-3xl text-paper">{title}</h2>
          <p className="lead mb-8 max-w-2xl text-paper/80">{body}</p>
          <CtaPair location={location} invert />
        </div>
      </div>
    </section>
  );
}
