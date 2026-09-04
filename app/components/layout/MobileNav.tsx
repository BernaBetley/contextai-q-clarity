"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

import { TrackedLink } from "../TrackedLink";

type NavLink = {
  href: string;
  label: string;
};

type MobileNavProps = {
  links: NavLink[];
  cta: NavLink;
};

export function MobileNav({ links, cta }: MobileNavProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleEscape);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        className="btn btn-sm btn-ghost"
        aria-expanded={open}
        aria-label={open ? "Fechar navegação" : "Abrir navegação"}
        onClick={() => setOpen((prev) => !prev)}
      >
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>

      {open ? (
        <div className="fixed inset-0 z-50 bg-paper">
          <div className="container-wide pt-20">
            <button
              type="button"
              className="btn btn-sm btn-ghost absolute right-5 top-4"
              aria-label="Fechar navegação"
              onClick={() => setOpen(false)}
            >
              <X size={20} />
            </button>

            <nav className="space-y-5 text-lg">
              <Link href="/" className="block font-serif text-2xl" onClick={() => setOpen(false)}>
                Início
              </Link>
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block text-foreground"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <TrackedLink
                href={cta.href}
                className="btn btn-primary btn-md w-full"
                eventName="cta_click"
                eventParams={{ location: "mobile_nav", cta: cta.label }}
                onClick={() => setOpen(false)}
              >
                {cta.label}
              </TrackedLink>
            </nav>
          </div>
        </div>
      ) : null}
    </div>
  );
}
