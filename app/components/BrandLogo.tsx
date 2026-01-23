import Link from "next/link";

interface BrandLogoProps {
  className?: string;
  showWordmark?: boolean;
}

function QMarkIcon() {
  return (
    <svg
      viewBox="0 0 64 64"
      aria-hidden="true"
      className="h-6 w-6 text-foreground"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="28" cy="28" r="18" stroke="currentColor" strokeWidth="6" />
      <path
        d="M40 40L56 56"
        stroke="currentColor"
        strokeWidth="6"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function BrandLogo({ className = "", showWordmark = true }: BrandLogoProps) {
  return (
    <Link href="/" className={`flex items-center gap-3 focus-ring ${className}`}>
      <span className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background shadow-subtle">
        <QMarkIcon />
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
