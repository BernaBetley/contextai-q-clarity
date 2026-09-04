import Link from "next/link";

import { products } from "../../lib/products";
import { siteConfig } from "../../lib/site";
import { BrandLogo } from "../BrandLogo";

const company = [
  { href: "/sobre", label: "Sobre" },
  { href: "/metodo", label: "Método" },
  { href: "/contacto", label: "Contacto" },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-secondary/40 no-print">
      <div className="container-wide py-14 md:py-16">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <BrandLogo className="mb-4" />
            <p className="text-small max-w-xs">
              ContextAIQ vende Prova: agentes práticos para PME portuguesas, com resultado medido e honorários híbridos.
            </p>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold">Prova</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/prova" className="text-small hover:text-foreground">
                  Linha de produtos
                </Link>
              </li>
              {products.map((product) => (
                <li key={product.slug}>
                  <Link href={product.href} className="text-small hover:text-foreground">
                    {product.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold">Prática</h4>
            <ul className="space-y-3">
              {company.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-small hover:text-foreground">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold">Legal</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/privacidade" className="text-small hover:text-foreground">
                  Privacidade
                </Link>
              </li>
              <li>
                <Link href="/termos" className="text-small hover:text-foreground">
                  Termos
                </Link>
              </li>
              <li>
                <a href="mailto:hello@contextaiq.com" className="text-small hover:text-foreground">
                  {siteConfig.contactEmail}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-border pt-6 md:flex-row md:items-center md:justify-between">
          <p className="text-small">
            © {new Date().getFullYear()} ContextAIQ. Marca da prática. Entidade: {siteConfig.legalEntity}.
          </p>
          <p className="text-small">Portugal. Trabalho remoto. Sem teatro de estratégia gratuita.</p>
        </div>
      </div>
    </footer>
  );
}
