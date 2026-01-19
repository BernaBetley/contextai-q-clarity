"use client";

import Link from "next/link";
import type { AnchorHTMLAttributes, MouseEvent } from "react";

import { trackEvent } from "../lib/analytics";

type TrackedLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  eventName?: string;
  eventParams?: Record<string, string | number | boolean | undefined>;
  external?: boolean;
};

export function TrackedLink({
  href,
  eventName,
  eventParams,
  external = false,
  onClick,
  ...rest
}: TrackedLinkProps) {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    if (event.defaultPrevented) return;
    if (eventName) trackEvent(eventName, eventParams);
  };

  if (external) {
    return <a href={href} onClick={handleClick} {...rest} />;
  }

  return <Link href={href} onClick={handleClick} {...rest} />;
}
