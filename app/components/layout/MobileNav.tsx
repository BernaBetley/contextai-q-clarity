"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, ArrowRight } from "lucide-react";

const navLinks = [
  { href: "/how-it-works", label: "How it works" },
  { href: "/services", label: "Services" },
  { href: "/audit", label: "Audit (€500)" },
  { href: "/signals", label: "Signals" },
  { href: "/resources", label: "Resources" },
  { href: "/contact", label: "Contact" },
];

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="lg:hidden">
      <button
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center justify-center p-2 rounded-md text-foreground hover:bg-secondary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        aria-label="Open menu"
      >
        <Menu size={24} />
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Slide-out panel */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-sm bg-background border-l border-border shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <span className="text-lg font-semibold">Menu</span>
            <button
              onClick={() => setIsOpen(false)}
              className="inline-flex items-center justify-center p-2 rounded-md text-foreground hover:bg-secondary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label="Close menu"
            >
              <X size={24} />
            </button>
          </div>

          {/* Navigation links */}
          <nav className="flex-1 overflow-y-auto p-4">
            <ul className="space-y-1">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="block px-4 py-3 text-base font-medium text-foreground rounded-md hover:bg-secondary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* CTA */}
          <div className="p-4 border-t border-border">
            <Link
              href="/audit"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center gap-2 w-full rounded-md bg-primary px-6 py-4 text-base font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              Run €500 Audit <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
