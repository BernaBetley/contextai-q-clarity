import Link from "next/link";

interface BrandLogoProps {
  className?: string;
  showWordmark?: boolean;
}

export function BrandLogo({ className = "", showWordmark = true }: BrandLogoProps) {
  return (
    <Link href="/" className={`flex items-center gap-3 focus-ring ${className}`}>
      <span className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background shadow-subtle">
        <span aria-hidden className="font-serif font-semibold text-2xl leading-none text-foreground">
          Q
        </span>
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
