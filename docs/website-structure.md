# Website Structure

This document maps the ContextAI Q website architecture for developers and content editors.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **UI Components**: Custom components + shadcn/ui patterns
- **Fonts**: Inter (sans) + Newsreader (serif) via `next/font`
- **Analytics**: Google Analytics 4 (optional)
- **Deployment**: Static export compatible

## Directory Structure

```
/workspace
├── app/                      # Next.js App Router
│   ├── layout.tsx            # Root layout (fonts, analytics, header/footer)
│   ├── page.tsx              # Homepage
│   ├── globals.css           # Design system tokens & base styles
│   │
│   ├── components/           # Shared components
│   │   ├── Analytics.tsx     # GA4 page tracking
│   │   ├── BrandLogo.tsx     # Logo component
│   │   ├── FAQ.tsx           # FAQ component with JSON-LD
│   │   ├── layout/
│   │   │   ├── Header.tsx    # Site header with navigation
│   │   │   ├── Footer.tsx    # Site footer
│   │   │   └── MobileNav.tsx # Mobile navigation drawer
│   │   └── ui/
│   │       └── accordion.tsx # Accordion component
│   │
│   ├── lib/                  # Utilities
│   │   ├── utils.ts          # Class merging (cn function)
│   │   └── analytics.ts      # Event tracking utilities
│   │
│   └── [pages]/              # Route directories (see Page Map below)
│
├── public/                   # Static assets
│   ├── contextaiq_logo_bw.svg
│   ├── contextaiq_logo_bw.png
│   ├── favicon.ico
│   ├── robots.txt
│   ├── sitemap.xml
│   ├── llms.txt              # LLM-friendly site summary
│   └── llm-facts.txt         # Atomic facts for AI citation
│
├── docs/                     # Documentation
│   ├── audit-summary.md      # Site audit and DoD
│   ├── analytics.md          # Analytics setup guide
│   └── website-structure.md  # This file
│
└── src/                      # Legacy Vite code (excluded from build)
```

## Page Map

| Route | File | Purpose | Key Content |
|-------|------|---------|-------------|
| `/` | `app/page.tsx` | Homepage | Hero, problem/solution, FAQ, sample output |
| `/audit` | `app/audit/page.tsx` | Product page | Pricing, scope, process, FAQ |
| `/services` | `app/services/page.tsx` | Service offerings | Audit, implementation, retainer |
| `/how-it-works` | `app/how-it-works/page.tsx` | Overview | 5-layer methodology summary |
| `/method` | `app/method/page.tsx` | Detailed methodology | 8-step process with I/O |
| `/measurement` | `app/measurement/page.tsx` | KPI definitions | AI SoV, citation rate, accuracy |
| `/about` | `app/about/page.tsx` | Company info | Mission, values, positioning |
| `/contact` | `app/contact/page.tsx` | Contact options | Email, call scheduling |
| `/fact-sheet` | `app/fact-sheet/page.tsx` | LLM citation source | Canonical facts |
| `/signals` | `app/signals/page.tsx` | Industry updates | Article listing |
| `/signals/[slug]` | `app/signals/[slug]/page.tsx` | Signal detail | Individual articles |
| `/resources` | `app/resources/page.tsx` | Educational content | Article listing |
| `/resources/[slug]` | `app/resources/[slug]/page.tsx` | Resource detail | Individual articles |
| `/privacy` | `app/privacy/page.tsx` | Privacy policy | Legal content |
| `/terms` | `app/terms/page.tsx` | Terms of service | Legal content |

## Component Inventory

### Layout Components

| Component | File | Description |
|-----------|------|-------------|
| `Header` | `app/components/layout/Header.tsx` | Fixed navigation bar |
| `Footer` | `app/components/layout/Footer.tsx` | Site footer with links |
| `MobileNav` | `app/components/layout/MobileNav.tsx` | Hamburger menu drawer |
| `BrandLogo` | `app/components/BrandLogo.tsx` | Logo with wordmark |

### Content Components

| Component | File | Description |
|-----------|------|-------------|
| `FAQ` | `app/components/FAQ.tsx` | Accordion FAQ list |
| `FAQSchema` | `app/components/FAQ.tsx` | JSON-LD for FAQPage |
| `Analytics` | `app/components/Analytics.tsx` | GA4 page view tracking |

### UI Components

| Component | File | Description |
|-----------|------|-------------|
| `Accordion` | `app/components/ui/accordion.tsx` | Expandable content |

## Design System

### CSS Classes (globals.css)

**Layout:**
- `.container-narrow` - Max 4xl width, padded
- `.container-wide` - Max 6xl width, padded
- `.section-slide` - Standard section padding

**Grid:**
- `.grid-2-col` - 2-column responsive grid
- `.grid-3-col` - 3-column responsive grid
- `.grid-4-col` - 4-column responsive grid

**Cards:**
- `.card-minimal` - Bordered card
- `.card-elevated` - Card with shadow

**Typography:**
- `.eyebrow` - Small uppercase label
- `.lead` - Large intro paragraph
- `.text-large` - Larger body text
- `.text-small` - Smaller muted text

### Color Tokens (CSS variables)

```css
--background      /* Page background */
--foreground      /* Primary text */
--primary         /* CTA buttons */
--primary-foreground
--secondary       /* Muted backgrounds */
--secondary-foreground
--muted           /* Subtle elements */
--muted-foreground
--border          /* Borders */
--ring            /* Focus rings */
```

## Content Editing Guide

### Adding a New Signal Article

1. Create `app/signals/[slug]/page.tsx` static data or CMS integration
2. Add entry to signals array in `app/signals/page.tsx`
3. Article will be accessible at `/signals/[slug]`

### Adding a New Resource Article

1. Create `app/resources/[slug]/page.tsx` static data or CMS integration
2. Add entry to resources array in `app/resources/page.tsx`
3. Resource will be accessible at `/resources/[slug]`

### Updating FAQ Content

1. Edit the `faqItems` array in `app/page.tsx` (homepage) or `app/audit/page.tsx`
2. Both question and answer are plain text
3. FAQPage schema is generated automatically

### Updating Pricing

1. Edit price in `app/audit/page.tsx` (hero section)
2. Update Service schema in same file
3. Update `app/services/page.tsx` pricing cards
4. Update `app/fact-sheet/page.tsx` canonical facts

## SEO Checklist

Each page should have:

- [ ] Unique `<title>` via Metadata export
- [ ] Unique `<meta name="description">`
- [ ] Canonical URL via `alternates.canonical`
- [ ] OpenGraph tags (inherited from layout)
- [ ] Appropriate JSON-LD schema
- [ ] H1 heading (one per page)
- [ ] Internal links to related pages

## Environment Variables

| Variable | Purpose | Required |
|----------|---------|----------|
| `NEXT_PUBLIC_GA4_MEASUREMENT_ID` | Google Analytics | No |
| `NEXT_PUBLIC_STRIPE_CHECKOUT_URL` | Stripe payment link | No |
| `NEXT_PUBLIC_AUDIT_INTAKE_URL` | Intake form link | No |
| `NEXT_PUBLIC_CALENDLY_URL` | Scheduling link | No |

All env vars are optional. Features degrade gracefully when not set.

## Build Commands

```bash
npm run dev        # Development server
npm run build      # Production build
npm run start      # Production server
npm run lint       # ESLint
npm run typecheck  # TypeScript check
npm run check      # Both lint + typecheck
```

---

*Last updated: January 2026*
