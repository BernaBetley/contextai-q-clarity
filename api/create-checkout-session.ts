const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const auditPriceId = process.env.STRIPE_AUDIT_PRICE_ID;

if (!stripeSecretKey) {
  throw new Error("Missing STRIPE_SECRET_KEY.");
}

if (!auditPriceId) {
  throw new Error("Missing STRIPE_AUDIT_PRICE_ID.");
}

export default async function handler(request: Request): Promise<Response> {
  if (request.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  const origin =
    process.env.NEXT_PUBLIC_APP_URL ??
    request.headers.get("origin") ??
    "https://contextaiq.com";

  const params = new URLSearchParams({
    mode: "payment",
    success_url: `${origin}/audit?checkout=success`,
    cancel_url: `${origin}/audit?checkout=cancelled`,
    "line_items[0][price]": auditPriceId,
    "line_items[0][quantity]": "1",
  });

  const stripeResponse = await fetch("https://api.stripe.com/v1/checkout/sessions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${stripeSecretKey}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params.toString(),
  });

  if (!stripeResponse.ok) {
    const errorText = await stripeResponse.text();
    return new Response(errorText || "Stripe checkout creation failed.", { status: 500 });
  }

  const session = (await stripeResponse.json()) as { url?: string };

  if (!session.url) {
    return new Response("Stripe session URL missing.", { status: 500 });
  }

  return new Response(JSON.stringify({ url: session.url }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
