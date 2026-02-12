import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { db } from "@/lib/db";
import { audits } from "@/lib/db/schema";
import { Resend } from "resend";

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error("Stripe webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const customerEmail = session.customer_details?.email ?? session.customer_email;

    // Create audit record
    const [audit] = await db
      .insert(audits)
      .values({
        status: "intake_pending",
        stripePaymentId: session.payment_intent as string ?? session.id,
        stripeCustomerEmail: customerEmail,
        clientEmail: customerEmail,
      })
      .returning();

    // Send intake email
    if (customerEmail) {
      const resend = new Resend(process.env.RESEND_API_KEY!);
      const siteUrl = process.env.NEXT_PUBLIC_SITE_URL!;

      await resend.emails.send({
        from: process.env.FROM_EMAIL!,
        to: customerEmail,
        subject: "Next step: Complete your AI Visibility Audit intake",
        html: `
          <div style="font-family: Inter, system-ui, sans-serif; max-width: 600px; margin: 0 auto; color: #212529;">
            <h1 style="font-size: 24px;">Thank you for your purchase</h1>
            <p style="color: #495057; font-size: 16px; line-height: 1.6;">
              Your AI Visibility Audit is confirmed. To get started, please complete
              the intake form below. This takes about 10 minutes and gives us everything
              we need to run your audit.
            </p>
            <a href="${siteUrl}/intake/${audit.id}" style="display: inline-block; background: #212529; color: #fff; padding: 14px 28px; border-radius: 6px; text-decoration: none; font-weight: 600; font-size: 16px; margin: 24px 0;">
              Complete intake form
            </a>
            <p style="color: #868e96; font-size: 14px;">
              Your audit will be delivered within 5–7 business days after intake completion.
            </p>
            <hr style="border: none; border-top: 1px solid #e9ecef; margin: 32px 0;" />
            <p style="color: #adb5bd; font-size: 12px;">ContextAI Q · AI Visibility Audit</p>
          </div>
        `,
      });
    }

    return NextResponse.json({ auditId: audit.id });
  }

  return NextResponse.json({ received: true });
}
