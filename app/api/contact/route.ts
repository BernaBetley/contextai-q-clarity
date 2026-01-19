import { NextResponse } from "next/server";
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

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = payloadSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid form submission." }, { status: 400 });
  }

  if (!env.CONTACT_WEBHOOK_URL) {
    return NextResponse.json(
      { error: "Contact form is not configured. Email hello@contextaiq.com instead." },
      { status: 501 }
    );
  }

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
    return NextResponse.json({ error: "Failed to send message. Please try again." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
