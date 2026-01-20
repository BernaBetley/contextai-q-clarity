import { NextResponse } from "next/server";

import { env } from "../../lib/env.server";
import { stripe } from "../../lib/stripe";

export async function POST(req: Request) {
  if (!env.STRIPE_SECRET_KEY) {
    return new NextResponse("Stripe secret key is missing", { status: 500 });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: "AI Visibility Audit",
              description: "Fixed-scope audit measuring your brand's visibility and accuracy across ChatGPT, Claude, Gemini, and Perplexity.",
            },
            unit_amount: 50000, // €500.00
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${env.NEXT_PUBLIC_SITE_URL}/audit?success=true`,
      cancel_url: `${env.NEXT_PUBLIC_SITE_URL}/audit?canceled=true`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Error creating checkout session:", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
