import Link from "next/link";

interface BrandLogoProps {
  className?: string;
  showWordmark?: boolean;
}

function QMagnifier({ size = 24 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 256 256"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="112" cy="112" r="80" stroke="currentColor" strokeWidth="18" />
      <line x1="170" y1="170" x2="232" y2="232" stroke="currentColor" strokeWidth="22" strokeLinecap="round" />
    </svg>
  );
}

export function BrandLogo({ className = "", showWordmark = true }: BrandLogoProps) {
  return (
    <Link href="/" className={`flex items-center gap-2.5 focus-ring ${className}`}>
      <span className="relative inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background shadow-subtle">
        <QMagnifier size={18} />
      </span>
      {showWordmark && (
        <span className="text-sm font-medium tracking-wide">
          <span className="text-muted-foreground">ContextAI</span>
          <span className="font-serif font-semibold text-foreground ml-1">Q</span>
        </span>
      )}
    </Link>
  );
}
