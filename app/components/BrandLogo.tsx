import Link from "next/link";

interface BrandLogoProps {
  className?: string;
  showWordmark?: boolean;
}

export function BrandLogo({ className = "", showWordmark = true }: BrandLogoProps) {
  return (
    <Link href="/" className={`flex items-center gap-3 focus-ring ${className}`}>
      <span className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background shadow-subtle">
        <svg
          aria-hidden
          viewBox="0 0 24 24"
          className="h-6 w-6 text-foreground"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="7" />
          <path d="M20 20l-3.5-3.5" />
        </svg>
      </span>
      {showWordmark && (
        <div className="leading-none">
          <span className="inline-flex items-baseline gap-2">
            <span className="text-sm uppercase tracking-[0.35em] text-muted-foreground">CONTEXTAI</span>
            <span className="text-lg font-serif font-semibold tracking-tight text-foreground">Q</span>
          </span>
        </div>
      )}
    </Link>
  );
}
