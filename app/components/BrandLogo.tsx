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
          viewBox="0 0 64 64"
          width="24"
          height="24"
          aria-hidden="true"
          focusable="false"
        >
          <circle cx="32" cy="32" r="28" fill="none" stroke="currentColor" strokeWidth="4" />
          <text
            x="32"
            y="40"
            textAnchor="middle"
            fontFamily="Georgia, 'Times New Roman', serif"
            fontSize="28"
            fontWeight="700"
            fill="currentColor"
          >
            Q
          </text>
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
