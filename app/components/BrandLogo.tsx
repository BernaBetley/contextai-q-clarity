import Link from "next/link";

interface BrandLogoProps {
  className?: string;
  showWordmark?: boolean;
}

export function BrandLogo({ className = "", showWordmark = true }: BrandLogoProps) {
  return (
    <Link href="/" className={`flex items-center gap-3 ${className}`}>
      <span className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background shadow-subtle">
        <svg
          aria-hidden="true"
          viewBox="0 0 40 40"
          className="h-6 w-6 text-foreground"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="20" cy="20" r="14" />
          <path d="M14 16.5c1.7-2 4.3-3.2 7-3.2 4.8 0 8.7 3.9 8.7 8.7 0 4.8-3.9 8.7-8.7 8.7-2.7 0-5.3-1.2-7-3.2" />
        </svg>
      </span>
      {showWordmark && (
        <div className="leading-none">
          <span className="block text-sm uppercase tracking-[0.3em] text-muted-foreground">
            ContextAI
          </span>
          <span className="block text-lg font-serif font-semibold tracking-tight">
            Q
          </span>
        </div>
      )}
    </Link>
  );
}
