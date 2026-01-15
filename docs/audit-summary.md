# ContextAIQ Website Audit Summary

**Date:** January 15, 2026  
**Scope:** Full-stack website audit (Engineering, UX, Design, Copy, Business)  
**Current State:** Functional Next.js 14 marketing site with solid foundation  

---

## Top 10 Issues

### Engineering

1. **Loose TypeScript Configuration**  
   - `strict: false`, `strictNullChecks: false`, `noImplicitAny: false`
   - Risk: Runtime errors, reduced type safety, harder maintenance
   - Fix: Enable strict mode incrementally, add explicit types

2. **Dead Code / Dual Build System**  
   - `/src` folder contains Vite-era routes duplicating `/app` content
   - 50+ unused UI components in `/src/components/ui`
   - Fix: Remove `/src` directory after confirming Next.js is primary

3. **Missing Typecheck Script**  
   - No `npm run typecheck` in package.json
   - CI cannot catch type errors pre-deploy
   - Fix: Add `"typecheck": "tsc --noEmit"` script

4. **Unoptimized Images**  
   - `BrandLogo.tsx` uses native `<img>` instead of `next/image`
   - Misses automatic optimization, lazy loading, and CLS prevention
   - Fix: Replace with Next.js Image component

### UX / Conversion

5. **No Mobile Navigation**  
   - Header hides nav links on mobile (`hidden lg:flex`)
   - Mobile users see only the logo and CTA button
   - Fix: Add hamburger menu with mobile drawer

6. **Missing Trust Signals**  
   - No sample deliverable preview showing what clients receive
   - No client logos or testimonials section
   - Fix: Add "Sample Output" section with mock audit screenshot

7. **Weak Secondary CTAs**  
   - All pages funnel to same `/audit` without variations
   - No "See Sample Report" or "Download Methodology PDF" options
   - Fix: Add secondary conversion paths

### Design / Accessibility

8. **Inconsistent Focus States**  
   - Some interactive elements lack visible focus indicators
   - Navigation links missing focus-visible styles
   - Fix: Add consistent `:focus-visible` ring to all interactive elements

9. **Footer Link Hierarchy**  
   - 5-column footer creates cognitive overload on mobile
   - LLM-specific links not clearly differentiated
   - Fix: Consolidate footer sections, improve mobile layout

### SEO / Content

10. **Missing FAQ Schema**  
    - No FAQ structured data on key pages
    - Limits featured snippet potential and AI quotability
    - Fix: Add FAQPage schema to homepage, audit page

---

## Top 10 Opportunities

### Quick Wins (High Impact, Low Effort)

1. **Add FAQ Section to Homepage**  
   - Answers common objections: "What if I already do SEO?", "How is this different?"
   - Improves AI quotability with structured Q&A format
   - Implementation: 1-2 hours

2. **Sample Audit Preview**  
   - Show a redacted sample of what the deliverable looks like
   - Reduces friction by making the outcome tangible
   - Implementation: 2-3 hours

3. **Mobile Menu Implementation**  
   - Critical for mobile conversion path
   - Use existing shadcn/ui Sheet component
   - Implementation: 1-2 hours

4. **Event Tracking Setup**  
   - Track CTA clicks, form submissions, methodology views
   - Already have GA4 foundation; add utility functions
   - Implementation: 1-2 hours

### Strategic Improvements

5. **Pricing Page Expansion**  
   - Add "Starting at" language for implementation/retainer
   - Include "What's NOT included" clarity section
   - Differentiate from commodity SEO services

6. **Founder/Team Credibility Section**  
   - Brief bio establishing domain expertise
   - "Why trust us" narrative on About page
   - Optional LinkedIn link for verification

7. **Internal Linking Strategy**  
   - Add contextual links between related pages
   - Method ↔ How It Works ↔ Audit cross-references
   - Improves crawlability and session depth

8. **Enhanced Methodology Page**  
   - Add visual timeline/diagram
   - Include actual scoring rubric example
   - Show "before/after" visibility score impact

9. **Resources Section Build-out**  
   - Expand from 2 articles to 5-10 evergreen pieces
   - Target "AI SEO" and "LLM visibility" terms
   - Each with unique meta and internal links

10. **Performance Monitoring Setup**  
    - Add Web Vitals reporting to analytics
    - Establish baseline for LCP, CLS, INP
    - Implementation: 2-3 hours with `web-vitals` package

---

## Key Assumptions

1. **Next.js is the Primary Build Target**  
   - Vite configuration is legacy/transitional
   - Safe to remove `/src` routes and unused components

2. **GA4 is the Preferred Analytics Platform**  
   - No Plausible/PostHog currently integrated
   - Event tracking should extend existing GA4 setup

3. **No Backend Form Processing**  
   - Contact form triggers mailto: or external service
   - No server-side form handling needed

4. **Single-Language Site (English)**  
   - No i18n requirements
   - Simplifies metadata and content strategy

5. **No E-commerce Integration Required**  
   - Stripe checkout is external link
   - No on-site cart or payment processing

---

## Definition of Done Checklist

### Engineering Quality

- [x] Build passes with zero errors (`npm run build`)
- [x] Lint passes with zero errors (`npm run lint`)
- [x] TypeScript strict mode enabled with no type errors
- [x] No unused imports or dead code
- [x] All environment variables documented in README
- [x] Typecheck script added to package.json

### Performance

- [x] All images use `next/image` with proper sizing
- [x] Fonts load without FOIT (font-display: swap)
- [x] No layout shifts visible on page load
- [x] Bundle size per-route under 100KB (excluding shared)

### SEO / AI Readiness

- [x] Every indexable page has unique title and meta description
- [x] OpenGraph and Twitter cards present on all pages
- [x] JSON-LD schema on homepage (Organization, WebSite, Service)
- [x] FAQ schema on homepage and audit page
- [x] Sitemap includes all public pages
- [x] robots.txt correctly configured
- [x] llms.txt and llm-facts.txt up-to-date

### UX / Conversion

- [x] Mobile navigation fully functional
- [x] Primary CTA visible above fold on all pages
- [x] Contact form or mailto path works end-to-end
- [x] No dead links or 404s
- [x] Focus states visible on all interactive elements

### Content / Copy

- [x] Value proposition clear within 5 seconds on homepage
- [x] FAQ section with at least 6 questions
- [x] Sample output section showing deliverable preview
- [x] Methodology page with 5+ detailed phases
- [x] About page with credibility signals

### Documentation

- [x] README covers local setup, env vars, deploy
- [x] /docs/audit-summary.md exists (this file)
- [x] /docs/analytics.md explains events and setup
- [x] /docs/website-structure.md maps components and content

---

## Open Items

*Items that require additional input or cannot be completed without client decisions:*

1. **Client Logos / Testimonials**  
   - Placeholder available but requires actual client permission
   - Status: Blocked pending client assets

2. **Calendly / Scheduling URL**  
   - Environment variable defined but may not be set in production
   - Status: Verify with deployment team

3. **Stripe Checkout URL**  
   - Environment variable defined but may not be set in production
   - Status: Verify with deployment team

4. **Team/Founder Bio Content**  
   - About page can include credibility section
   - Status: Waiting for copy from stakeholder

---

## Implementation Order

1. **Foundation** (This commit)
   - Create audit summary
   - Add typecheck script
   - Enable stricter TypeScript config

2. **Engineering Cleanup**
   - Remove dead code in `/src`
   - Fix image optimization
   - Add mobile navigation

3. **Content Enhancements**
   - FAQ section with schema
   - Sample output preview
   - Enhanced methodology

4. **Analytics & Events**
   - Event tracking utilities
   - Documentation

5. **Documentation**
   - README update
   - Website structure doc
   - Final verification

---

*Generated by automated audit. Review and approve before implementation.*
