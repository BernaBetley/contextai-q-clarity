import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

import { env } from "../../lib/env.server";

const payloadSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  company: z.string().optional(),
  role: z.string().optional(),
  website: z.string().optional(),
  message: z.string().min(1),
  timeline: z.string().optional(),
});

const resend = env.RESEND_API_KEY ? new Resend(env.RESEND_API_KEY) : null;

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = payloadSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid form submission." }, { status: 400 });
  }

  // Fallback if no Resend key is configured (dev mode or webhook legacy)
  if (!resend) {
    // If legacy webhook is configured, try that as fallback
    if (env.CONTACT_WEBHOOK_URL) {
      const response = await fetch(env.CONTACT_WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(env.CONTACT_WEBHOOK_SECRET ? { "X-Contact-Secret": env.CONTACT_WEBHOOK_SECRET } : {}),
        },
        body: JSON.stringify({
          ...parsed.data,
          receivedAt: new Date().toISOString(),
          source: "contextaiq.com",
        }),
      });

      if (!response.ok) {
        return NextResponse.json({ error: "Failed to send message via fallback." }, { status: 502 });
      }
      return NextResponse.json({ ok: true });
    }

    // No config at all
    return NextResponse.json(
      { error: "Contact form is not configured. Email hello@contextaiq.com instead." },
      { status: 501 }
    );
  }

  try {
    const { name, email, company, role, website, message, timeline } = parsed.data;
    
    // Send email to admin
    await resend.emails.send({
      from: "ContextAI Q Contact <onboarding@resend.dev>", // Note: Update this to your verified domain in production
      to: ["hello@contextaiq.com"], // Delivering to the business
      replyTo: email,
      subject: `New contact from ${name} (${company || "No Company"})`,
      html: `
        <h2>New Contact Request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Company:</strong> ${company || "N/A"}</p>
        <p><strong>Role:</strong> ${role || "N/A"}</p>
        <p><strong>Website:</strong> ${website || "N/A"}</p>
        <p><strong>Timeline:</strong> ${timeline || "N/A"}</p>
        <hr />
        <h3>Message:</h3>
        <p>${message.replace(/\n/g, "<br/>")}</p>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Resend error:", error);
    return NextResponse.json({ error: "Failed to send message." }, { status: 500 });
  }
}
