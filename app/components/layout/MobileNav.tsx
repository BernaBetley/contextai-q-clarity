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
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [open]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        className="btn btn-sm btn-ghost"
        aria-expanded={open}
        aria-label="Toggle navigation"
        onClick={() => setOpen((prev) => !prev)}
      >
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>

      {open ? (
        <div
          className="fixed inset-0 z-[1100] bg-background"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
        >
          <div className="container-wide pt-24 pb-12 h-[100dvh] overflow-y-auto">
            <button
              type="button"
              className="btn btn-sm btn-ghost absolute top-6 right-6"
              aria-label="Close navigation"
              onClick={() => setOpen(false)}
            >
              <X size={20} />
            </button>

            <nav className="space-y-6 text-lg">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block text-foreground hover:text-muted-foreground"
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
