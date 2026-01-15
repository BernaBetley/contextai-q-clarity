import Link from "next/link";

import { BrandLogo } from "../BrandLogo";
import { TrackedLink } from "../TrackedLink";
import { MobileNav } from "./MobileNav";

const navLinks = [
  { href: "/method", label: "Methodology" },
  { href: "/deliverables", label: "Deliverables" },
  { href: "/services", label: "Pricing" },
  { href: "/resources", label: "Resources" },
  { href: "/contact", label: "Contact" },
];

const primaryCta = { href: "/audit", label: "Start the audit" };

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border shadow-subtle no-print">
      <div className="container-wide">
        <nav className="flex items-center justify-between h-16 md:h-20">
          <BrandLogo />

          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-ring"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <TrackedLink
              href={primaryCta.href}
              className="btn btn-primary btn-sm"
              eventName="cta_click"
              eventParams={{ location: "header", cta: primaryCta.label }}
            >
              {primaryCta.label}
            </TrackedLink>
          </div>

          <MobileNav links={navLinks} cta={primaryCta} />
        </nav>
      </div>
    </header>
  );
}
