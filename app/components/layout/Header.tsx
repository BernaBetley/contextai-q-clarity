import Link from "next/link";

import { BrandLogo } from "../BrandLogo";
import { TrackedLink } from "../TrackedLink";
import { MobileNav } from "./MobileNav";
import { navLinks, primaryCta } from "../../lib/nav";

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-paper/95 backdrop-blur-sm no-print">
      <div className="container-wide">
        <nav className="flex h-16 items-center justify-between md:h-[4.25rem]">
          <BrandLogo />

          <div className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-ring"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex">
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
