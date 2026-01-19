# ContextAI Q Website

This repo contains the ContextAI Q marketing site and content.

## Local development

```sh
npm install
npm run dev
```

## Builds

- `npm run build`: Next.js production build (primary)
- `npm run lint`: Lint the codebase
- `npm run typecheck`: TypeScript typecheck

## Environment variables

- `NEXT_PUBLIC_SITE_URL`: Canonical site URL used for metadata (default: https://contextaiq.com)
- `NEXT_PUBLIC_GA4_MEASUREMENT_ID`: Enables GA4 tracking
- `NEXT_PUBLIC_AUDIT_INTAKE_URL`: Intake form link shared after scope confirmation
- `NEXT_PUBLIC_CALENDLY_URL`: Scheduling link on Contact
- `CONTACT_WEBHOOK_URL`: Required webhook endpoint for contact form submissions
- `CONTACT_WEBHOOK_SECRET`: Optional secret header for the contact webhook

Create a `.env.local` file for local development.

## Deploy

```sh
npm install
npm run build
npm run start
```

If deploying to a platform like Vercel, set the environment variables above.

## Content editing guide

See `docs/website-structure.md` for page locations and content structure.

## Notes

- `public/llms.txt` and `public/llm-facts.txt` are provided for LLM-friendly discovery and citation.
