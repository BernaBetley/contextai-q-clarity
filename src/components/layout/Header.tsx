import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/how-it-works", label: "How it works" },
  { href: "/services", label: "Services" },
  { href: "/audit", label: "Audit (€500)" },
  { href: "/signals", label: "Signals" },
  { href: "/resources", label: "Resources" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 no-print ${
        isScrolled
          ? "bg-background/95 backdrop-blur-sm border-b border-border shadow-subtle"
          : "bg-transparent"
      }`}
    >
      <div className="container-wide">
        <nav className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 focus-ring">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background shadow-subtle">
              <img src="/contextaiq_logo_bw.svg" alt="ContextAI Q" className="h-6 w-6" />
            </span>
            <span className="hidden sm:inline-flex items-baseline gap-2 text-sm uppercase tracking-[0.3em] text-muted-foreground">
              <span>ContextAI</span>
              <span className="font-serif font-semibold text-foreground tracking-tight">Q</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`px-4 py-2 text-sm font-medium transition-colors ${
                  location.pathname === link.href
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:flex items-center gap-4">
            <Link to="/audit">
              <Button variant="cta" size="default">
                Run €500 Audit
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-foreground"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div
            className="lg:hidden fixed inset-0 z-[60] bg-background"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
          >
            <div className="container-wide pt-24 pb-12 h-[100dvh] overflow-y-auto">
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="lg:hidden p-2 text-foreground absolute top-6 right-6"
                aria-label="Close menu"
              >
                <X size={24} />
              </button>

              <div className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    className={`px-4 py-3 text-sm font-medium rounded-md transition-colors ${
                      location.pathname === link.href
                        ? "bg-secondary text-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="pt-4 mt-2 border-t border-border">
                  <Link to="/audit" className="block">
                    <Button variant="cta" className="w-full">
                      Run €500 Audit
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
