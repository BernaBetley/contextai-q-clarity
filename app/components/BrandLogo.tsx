import Image from "next/image";
import Link from "next/link";

interface BrandLogoProps {
  className?: string;
  showWordmark?: boolean;
}

export function BrandLogo({ className = "", showWordmark = true }: BrandLogoProps) {
  return (
    <Link href="/" className={`flex items-center gap-3 focus-ring ${className}`}>
      <span className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background shadow-subtle">
        <Image src="/contextaiq_logo_bw.svg" alt="ContextAI Q" width={24} height={24} priority />
      </span>
      {showWordmark && (
        <div className="leading-none">
          <span className="inline-flex items-baseline gap-2 text-sm uppercase tracking-[0.3em] text-muted-foreground">
            <span>ContextAI</span>
            <span className="font-serif font-semibold text-foreground tracking-tight">Q</span>
          </span>
        </div>
      )}
    </Link>
  );
}
