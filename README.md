# ContextAI Q Website

Marketing website for ContextAI Q — AI visibility measurement and optimization for B2B brands.

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:3000
```

## Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI**: Custom components with [shadcn/ui](https://ui.shadcn.com/) patterns
- **Fonts**: Inter + Newsreader via `next/font/google`
- **Analytics**: Google Analytics 4 (optional)

## Project Structure

```
├── app/                    # Next.js App Router
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Homepage
│   ├── components/         # Shared components
│   ├── lib/                # Utilities
│   └── [route]/page.tsx    # Page routes
├── public/                 # Static assets
├── docs/                   # Documentation
└── src/                    # Legacy (excluded from build)
```

See [docs/website-structure.md](docs/website-structure.md) for detailed component and page mapping.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Run TypeScript checks |
| `npm run check` | Run both lint + typecheck |

## Environment Variables

Create a `.env.local` file for local development:

```bash
# Google Analytics 4 (optional)
NEXT_PUBLIC_GA4_MEASUREMENT_ID=G-XXXXXXXXXX

# Stripe checkout URL (optional)
NEXT_PUBLIC_STRIPE_CHECKOUT_URL=https://buy.stripe.com/xxx

# Audit intake form URL (optional)
NEXT_PUBLIC_AUDIT_INTAKE_URL=https://forms.example.com/intake

# Calendly scheduling URL (optional)
NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/contextaiq
```

All environment variables are optional. Features gracefully degrade when not set:
- Without GA4 ID: No analytics tracking
- Without Stripe URL: CTA links to contact page
- Without Calendly URL: Email link shown instead

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import in [Vercel](https://vercel.com/)
3. Set environment variables in Vercel dashboard
4. Deploy

### Static Export

```bash
npm run build
# Output in .next/ directory
```

### Other Platforms

The site is compatible with any platform that supports Next.js 14:
- Netlify
- AWS Amplify
- Railway
- Self-hosted (Node.js required)

## Content Editing

### Updating Copy

Most content is in page files under `app/`:
- Homepage: `app/page.tsx`
- Audit page: `app/audit/page.tsx`
- Services: `app/services/page.tsx`

### Adding Blog/Signal Posts

1. Add entry to the signals array in `app/signals/page.tsx`
2. Create content in `app/signals/[slug]/page.tsx`

### Updating Pricing

Update in multiple locations:
- `app/audit/page.tsx` (primary)
- `app/services/page.tsx`
- `app/fact-sheet/page.tsx`
- JSON-LD schemas in respective pages

### SEO Metadata

Each page exports a `metadata` object:

```tsx
export const metadata: Metadata = {
  title: "Page Title",
  description: "Page description for search results",
  alternates: { canonical: "/page-url" },
};
```

## Analytics

See [docs/analytics.md](docs/analytics.md) for:
- GA4 setup instructions
- Event tracking implementation
- Key metrics to monitor

## Documentation

- [docs/audit-summary.md](docs/audit-summary.md) — Site audit and improvement plan
- [docs/analytics.md](docs/analytics.md) — Analytics setup guide
- [docs/website-structure.md](docs/website-structure.md) — Component and page mapping

## Development Guidelines

### TypeScript

The project uses strict TypeScript. Run `npm run typecheck` before committing.

### Styling

- Use Tailwind utility classes
- Custom utilities defined in `app/globals.css`
- Design tokens use CSS custom properties

### Components

- Shared components in `app/components/`
- Page-specific components can be defined in page files
- Use `cn()` utility for conditional classes

### Accessibility

- All interactive elements have focus states
- Color contrast meets WCAG AA
- Mobile navigation is keyboard accessible

## LLM-Friendly Content

The site includes files optimized for AI citation:
- `/llms.txt` — Site summary and canonical URLs
- `/llm-facts.txt` — Atomic facts for citation
- `/fact-sheet` — Human-readable fact sheet page

## License

Proprietary. © ContextAI Q.

---

For questions or issues, contact [hello@contextaiq.com](mailto:hello@contextaiq.com).
