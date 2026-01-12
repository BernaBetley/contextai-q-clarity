import { Link } from "react-router-dom";

const footerLinks = {
  company: [
    { href: "/about", label: "About" },
    { href: "/how-it-works", label: "How it works" },
    { href: "/contact", label: "Contact" },
  ],
  services: [
    { href: "/audit", label: "AI Visibility Audit" },
    { href: "/services", label: "All Services" },
    { href: "/measurement", label: "Proof & Measurement" },
  ],
  resources: [
    { href: "/signals", label: "Signals" },
    { href: "/resources", label: "Resources" },
    { href: "/method", label: "Methodology" },
  ],
  llm: [
    { href: "/fact-sheet", label: "Fact Sheet" },
    { href: "/llms.txt", label: "llms.txt" },
    { href: "/llm-facts.txt", label: "llm-facts.txt" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-border bg-secondary/30 no-print">
      <div className="container-wide py-16 md:py-20">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="inline-block mb-4">
              <img
                src="/contextaiq_logo_bw.png"
                alt="ContextAI Q"
                className="h-8 w-auto"
              />
            </Link>
            <p className="text-small max-w-xs">
              Making brands visible and accurately represented in AI-generated answers.
            </p>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-semibold mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-small hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-sm font-semibold mb-4">Services</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-small hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-sm font-semibold mb-4">Resources</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-small hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* LLM Native */}
          <div>
            <h4 className="text-sm font-semibold mb-4">LLM Native</h4>
            <ul className="space-y-3">
              {footerLinks.llm.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-small hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-small">
            © {new Date().getFullYear()} ContextAI Q. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link to="/privacy" className="text-small hover:text-foreground transition-colors">
              Privacy
            </Link>
            <Link to="/terms" className="text-small hover:text-foreground transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
