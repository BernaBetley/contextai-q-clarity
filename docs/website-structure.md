# Website Structure

## Runtime
- **Framework**: Next.js App Router (`app/`)
- **Primary entry**: `app/layout.tsx` and page routes in `app/**/page.tsx`
- **Legacy**: `src/` contains a Vite/React app and is not used in the Next.js build.

## Key Directories
- `app/` — All production pages and layout.
- `app/components/` — Shared UI and content components.
- `app/components/layout/` — Header, footer, and mobile navigation.
- `app/lib/` — Metadata helpers, analytics utilities, env validation.
- `public/` — Static assets and crawler-facing files (`sitemap.xml`, `llms.txt`).
- `docs/` — Audit summary, analytics, and handoff documentation.

## Content Editing Guide
### Core Pages
- Home: `app/page.tsx`
- Audit: `app/audit/page.tsx`
- Deliverables: `app/deliverables/page.tsx`
- Pricing: `app/services/page.tsx`
- Methodology: `app/method/page.tsx`
- Contact: `app/contact/page.tsx`
- About: `app/about/page.tsx`

### Resources & Signals
Content is stored inline as JSON in page files:
- Resources index: `app/resources/page.tsx`
- Resource articles: `app/resources/[slug]/page.tsx`
- Signals index: `app/signals/page.tsx`
- Signal articles: `app/signals/[slug]/page.tsx`

## Metadata & Structured Data
- Shared metadata builder: `app/lib/metadata.ts`
- Site config: `app/lib/site.ts`
- JSON-LD components: `app/components/StructuredData.tsx`

## Analytics
- Page tracking: `app/components/Analytics.tsx`
- CTA tracking: `app/components/TrackedLink.tsx`
- Form tracking: `app/components/ContactForm.tsx`

## Environment Variables
Validated in `app/lib/env.server.ts` and documented in `README.md`.
