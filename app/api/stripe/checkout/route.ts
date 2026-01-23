import { NextResponse } from "next/server";
import Stripe from "stripe";

import { env } from "../../../lib/env.server";

type CheckoutRequestBody = {
  product?: "audit";
};

const stripe = env.STRIPE_SECRET_KEY
  ? new Stripe(env.STRIPE_SECRET_KEY, {
      // Use the library's pinned default API version.
    })
  : null;

export async function POST(request: Request) {
  if (!stripe) {
    return NextResponse.json({ error: "Stripe is not configured." }, { status: 501 });
  }

  if (!env.STRIPE_AUDIT_PRICE_ID) {
    return NextResponse.json({ error: "Stripe price is not configured." }, { status: 501 });
  }

  const body = (await request.json().catch(() => ({}))) as CheckoutRequestBody;
  const product = body.product ?? "audit";

  if (product !== "audit") {
    return NextResponse.json({ error: "Unknown product." }, { status: 400 });
  }

  const siteUrl = env.NEXT_PUBLIC_SITE_URL;
  const success_url = new URL("/audit?success=1", siteUrl).toString();
  const cancel_url = new URL("/audit?canceled=1", siteUrl).toString();

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: [{ price: env.STRIPE_AUDIT_PRICE_ID, quantity: 1 }],
    success_url,
    cancel_url,
    allow_promotion_codes: true,
    metadata: {
      product: "audit",
    },
  });

  return NextResponse.json({ url: session.url });
}

