import Link from "next/link";
import Image from "next/image";

interface BrandLogoProps {
  className?: string;
  showWordmark?: boolean;
}

export function BrandLogo({ className = "", showWordmark = true }: BrandLogoProps) {
  return (
    <Link href="/" className={`flex items-center gap-3 ${className}`}>
      <span className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background shadow-subtle">
        <Image src="/contextaiq_logo_bw.png" alt="ContextAI Q" width={24} height={24} priority />
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
