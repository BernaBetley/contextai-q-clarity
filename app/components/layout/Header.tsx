import Link from "next/link";
import { BrandLogo } from "../BrandLogo";
import { MobileNav } from "./MobileNav";

const navLinks = [
  { href: "/how-it-works", label: "How it works" },
  { href: "/services", label: "Services" },
  { href: "/audit", label: "Audit (€500)" },
  { href: "/signals", label: "Signals" },
  { href: "/resources", label: "Resources" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border shadow-subtle no-print">
      <div className="container-wide">
        <nav className="flex items-center justify-between h-16 md:h-20" aria-label="Main navigation">
          <BrandLogo />

          {/* Desktop navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-md"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            {/* Desktop CTA */}
            <Link
              href="/audit"
              className="hidden md:inline-flex items-center justify-center rounded-md bg-foreground px-5 py-2 text-sm font-medium text-background shadow-subtle transition-all duration-200 hover:-translate-y-0.5 hover:shadow-elevated focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              Run €500 Audit
            </Link>

            {/* Mobile navigation */}
            <MobileNav />
          </div>
        </nav>
      </div>
    </header>
  );
}
