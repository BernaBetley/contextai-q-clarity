# ContextAI Q website

## Getting started

This project runs on Node.js with npm.

```sh
git clone <YOUR_GIT_URL>
cd <YOUR_PROJECT_NAME>
npm install
npm run dev
```

## Tech stack

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## Stripe checkout configuration

The audit page supports two checkout modes:

1) **API-driven checkout (recommended)** using Vercel serverless functions and your Stripe API keys.
2) **Direct payment link** using a Stripe-hosted checkout URL.

### API-driven checkout (Vercel)

Set these environment variables in Vercel (or `.env.local` for local dev):

```sh
STRIPE_SECRET_KEY="sk_live_..."
STRIPE_AUDIT_PRICE_ID="price_..."
NEXT_PUBLIC_APP_URL="https://contextaiq.com"
```

The `/api/create-checkout-session` endpoint will create a Stripe Checkout session and redirect users.

### Direct payment link

To enable the audit purchase buttons using a Stripe Payment Link, define a checkout URL at build time:

```sh
VITE_STRIPE_CHECKOUT_URL="https://buy.stripe.com/your_checkout_link"
```

In local development, add this to a `.env.local` file. In production, set the same
environment variable in your hosting provider before building the site.

## Deployment

Build and deploy with your preferred Node.js hosting provider. Ensure the Stripe
environment variables are set in your deployment environment before building.
