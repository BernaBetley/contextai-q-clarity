import Link from "next/link";
import Image from "next/image";

interface BrandLogoProps {
  className?: string;
  showWordmark?: boolean;
}

export function BrandLogo({ className = "", showWordmark = true }: BrandLogoProps) {
  return (
    <Link 
      href="/" 
      className={`flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-md ${className}`}
    >
      <span className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background shadow-subtle">
        <Image
          src="/contextaiq_logo_bw.svg"
          alt="ContextAI Q"
          width={24}
          height={24}
          className="h-6 w-6"
          priority
        />
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
