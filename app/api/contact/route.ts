import { NextResponse } from "next/server";
import { z } from "zod";

import { env } from "../../lib/env.server";

const payloadSchema = z.object({
  name: z.string().min(1).max(200),
  email: z.string().email().max(320),
  company: z.string().max(200).optional(),
  role: z.string().max(200).optional(),
  website: z.string().url().max(2000).optional().or(z.literal("")),
  message: z.string().min(1).max(5000),
  timeline: z.string().max(200).optional(),
});

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 5;
const requestLog = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = requestLog.get(ip) ?? [];
  const recent = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  recent.push(now);
  requestLog.set(ip, recent);
  return recent.length > RATE_LIMIT_MAX;
}

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }

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

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10_000);

  try {
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
      signal: controller.signal,
    });

    if (!response.ok) {
      return NextResponse.json({ error: "Failed to send message. Please try again." }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Failed to send message. Please try again." }, { status: 502 });
  } finally {
    clearTimeout(timeout);
  }
}
