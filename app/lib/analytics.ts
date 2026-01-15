/**
 * Analytics utility for tracking events across the site.
 * 
 * This module provides a unified interface for tracking user interactions.
 * Currently supports Google Analytics 4 (GA4) via gtag.
 * 
 * Environment variable: NEXT_PUBLIC_GA4_MEASUREMENT_ID
 * 
 * @example
 * import { trackEvent, trackCTAClick } from '@/lib/analytics';
 * 
 * // Generic event
 * trackEvent('button_click', { button_name: 'hero_cta' });
 * 
 * // CTA click
 * trackCTAClick('hero', 'audit');
 */

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

type EventParams = Record<string, string | number | boolean>;

/**
 * Track a custom event
 */
export function trackEvent(eventName: string, params?: EventParams): void {
  if (typeof window === "undefined") return;
  if (typeof window.gtag !== "function") return;

  window.gtag("event", eventName, params);
}

/**
 * Track a CTA button click
 */
export function trackCTAClick(location: string, destination: string): void {
  trackEvent("cta_click", {
    cta_location: location,
    cta_destination: destination,
  });
}

/**
 * Track form submission
 */
export function trackFormSubmit(formName: string, success: boolean): void {
  trackEvent("form_submit", {
    form_name: formName,
    form_success: success,
  });
}

/**
 * Track methodology view (when user views detailed methodology)
 */
export function trackMethodologyView(section: string): void {
  trackEvent("methodology_view", {
    methodology_section: section,
  });
}

/**
 * Track pricing/offer view
 */
export function trackOfferView(offerName: string, price: string): void {
  trackEvent("offer_view", {
    offer_name: offerName,
    offer_price: price,
  });
}

/**
 * Track external link click (e.g., Stripe checkout, Calendly)
 */
export function trackExternalLink(linkType: string, url: string): void {
  trackEvent("external_link_click", {
    link_type: linkType,
    link_url: url,
  });
}

/**
 * Track FAQ interaction
 */
export function trackFAQExpand(question: string): void {
  trackEvent("faq_expand", {
    faq_question: question.slice(0, 100), // Truncate for GA limits
  });
}

/**
 * Track scroll depth
 */
export function trackScrollDepth(percentage: number): void {
  trackEvent("scroll_depth", {
    scroll_percentage: percentage,
  });
}
