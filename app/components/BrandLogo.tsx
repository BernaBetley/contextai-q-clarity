import Link from "next/link";

import { Mark } from "./Mark";

interface BrandLogoProps {
  className?: string;
  showWordmark?: boolean;
}

export function BrandLogo({ className = "", showWordmark = true }: BrandLogoProps) {
  return (
    <Link href="/" className={`flex items-center gap-2.5 focus-ring ${className}`}>
      <Mark className="h-9 w-9" />
      {showWordmark ? (
        <span className="leading-none">
          <span className="block font-serif text-lg font-semibold tracking-tight text-ink">ContextAIQ</span>
          <span className="mt-0.5 block text-[0.65rem] uppercase tracking-[0.18em] text-copper">Prática Prova</span>
        </span>
      ) : (
        <span className="sr-only">ContextAIQ</span>
      )}
    </Link>
  );
}
