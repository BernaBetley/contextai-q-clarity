import { ArrowRight } from "lucide-react";

import type { Product } from "../lib/products";
import { ProvaBadge } from "./ProvaBadge";
import { TrackedLink } from "./TrackedLink";

export function ProductCard({
  product,
  location,
}: {
  product: Product;
  location: string;
}) {
  return (
    <article className="card-minimal flex h-full flex-col">
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <ProvaBadge>Prova {product.shortName}</ProvaBadge>
        {product.nested ? <span className="badge-tag">Produto aninhado</span> : null}
        {product.featured && !product.nested ? <span className="badge-tag">Prioridade comercial</span> : null}
      </div>
      <h3 className="mb-2">{product.name}</h3>
      <p className="mb-4 text-muted-foreground">{product.summary}</p>
      <p className="mb-6 text-sm">
        <span className="font-medium text-foreground">Unidade: </span>
        <span className="text-muted-foreground">{product.unit}</span>
      </p>
      <p className="mb-6 text-sm text-muted-foreground">{product.commercial}</p>
      <TrackedLink
        href={product.href}
        className={`btn btn-sm mt-auto ${product.featured ? "btn-primary" : "btn-secondary"}`}
        eventName="cta_click"
        eventParams={{ location, cta: product.name }}
      >
        Ver {product.shortName} <ArrowRight size={16} />
      </TrackedLink>
    </article>
  );
}
