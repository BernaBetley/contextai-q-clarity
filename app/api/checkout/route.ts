import Stripe from "stripe";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

function getOrigin(req: Request) {
  const fromHeader = req.headers.get("origin") || req.headers.get("referer");
  if (fromHeader) {
    try {
      const url = new URL(fromHeader);
      return url.origin;
    } catch {
      // ignore
    }
  }

  return process.env.NEXT_PUBLIC_SITE_URL || "https://contextaiq.com";
}

export async function POST(req: Request) {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  const priceId = process.env.STRIPE_AUDIT_PRICE_ID;

  if (!secretKey || !priceId) {
    return Response.json(
      { error: "Stripe is not configured. Set STRIPE_SECRET_KEY and STRIPE_AUDIT_PRICE_ID." },
      { status: 503 }
    );
  }

  const origin = getOrigin(req);

  try {
    const stripe = new Stripe(secretKey);
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${origin}/audit/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/audit`,
      allow_promotion_codes: true,
      billing_address_collection: "auto",
      metadata: {
        product: "ai_visibility_audit",
      },
    });

    if (!session.url) {
      return Response.json({ error: "Stripe session created but no redirect URL was returned." }, { status: 502 });
    }

    return Response.json({ url: session.url });
  } catch (err) {
    const message =
      err instanceof Error
        ? err.message
        : "Stripe checkout failed. Verify STRIPE_SECRET_KEY and STRIPE_AUDIT_PRICE_ID.";
    return Response.json({ error: message }, { status: 502 });
  }
}

