import { NextResponse } from "next/server";
import Stripe from "stripe";

import { env } from "../../../lib/env.server";

function getSiteUrl() {
  return env.NEXT_PUBLIC_SITE_URL ?? "https://contextaiq.com";
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const product = url.searchParams.get("product") ?? "audit";

  if (product !== "audit") {
    return NextResponse.json({ error: "Unknown product." }, { status: 400 });
  }

  if (!env.STRIPE_SECRET_KEY || !env.STRIPE_AUDIT_PRICE_ID) {
    return NextResponse.json(
      { error: "Stripe is not configured on this deployment." },
      { status: 501 }
    );
  }

  const siteUrl = getSiteUrl();
  const successUrl = new URL("/audit?checkout=success", siteUrl).toString();
  const cancelUrl = new URL("/audit?checkout=cancel", siteUrl).toString();

  const stripe = new Stripe(env.STRIPE_SECRET_KEY, {
    apiVersion: "2024-06-20",
  });

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: [{ price: env.STRIPE_AUDIT_PRICE_ID, quantity: 1 }],
    success_url: successUrl,
    cancel_url: cancelUrl,
    metadata: {
      product,
      source: "website",
    },
  });

  if (!session.url) {
    return NextResponse.json({ error: "Failed to create checkout session." }, { status: 502 });
  }

  return NextResponse.redirect(session.url, { status: 303 });
}

