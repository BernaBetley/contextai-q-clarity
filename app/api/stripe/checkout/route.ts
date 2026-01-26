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

  if (!env.STRIPE_SECRET_KEY) {
    return NextResponse.json(
      { error: "Stripe is not configured on this deployment." },
      { status: 501 }
    );
  }

  const siteUrl = getSiteUrl();
  const successUrl = new URL("/audit?checkout=success", siteUrl).toString();
  const cancelUrl = new URL("/audit?checkout=cancel", siteUrl).toString();

  const stripe = new Stripe(env.STRIPE_SECRET_KEY, {
    apiVersion: "2025-12-15.clover",
  });

  const lineItem = env.STRIPE_AUDIT_PRICE_ID
    ? { price: env.STRIPE_AUDIT_PRICE_ID, quantity: 1 }
    : {
        price_data: {
          currency: "eur",
          unit_amount: 50000,
          product_data: {
            name: "AI Visibility Audit",
          },
        },
        quantity: 1,
      };

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: [lineItem],
    success_url: successUrl,
    cancel_url: cancelUrl,
    invoice_creation: { enabled: true },
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

