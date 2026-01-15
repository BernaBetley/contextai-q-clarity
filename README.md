# ContextAI Q Website

This repo contains the ContextAI Q marketing site and content.

## Local development

```sh
npm install
npm run dev
```

## Builds

- `npm run build`: Next.js production build (primary)
- `npm run build:vite`: Vite SPA build (legacy / transitional)

## Environment variables

- `NEXT_PUBLIC_GA4_MEASUREMENT_ID`: Enables GA4 pageview tracking in Next.js
- `NEXT_PUBLIC_AUDIT_INTAKE_URL`: Intake form link shown after purchase
- `NEXT_PUBLIC_CALENDLY_URL`: Scheduling link on Contact
- `NEXT_PUBLIC_SITE_URL`: Canonical origin for server redirects (fallback is `https://contextaiq.com`)

### Stripe (server-side)

- `STRIPE_SECRET_KEY`: Stripe secret key (server-side)
- `STRIPE_AUDIT_PRICE_ID`: Stripe Price ID for the €500 audit (server-side)

## Notes

- `public/llms.txt` and `public/llm-facts.txt` are provided for LLM-friendly discovery and citation.
