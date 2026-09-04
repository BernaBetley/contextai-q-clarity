import { NextResponse } from "next/server";
import { z } from "zod";

import { env } from "../../lib/env.server";

const payloadSchema = z.object({
  name: z.string().min(1).max(200),
  email: z.string().email().max(320),
  company: z.string().min(1).max(200),
  process: z.string().min(1).max(80),
  volume: z.string().min(1).max(400),
  message: z.string().max(5000).optional().or(z.literal("")),
  role: z.string().max(200).optional(),
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
    return NextResponse.json({ error: "Demasiados pedidos. Tente mais tarde." }, { status: 429 });
  }

  const body = await request.json().catch(() => null);
  const parsed = payloadSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Pedido inválido. Verifique os campos obrigatórios." }, { status: 400 });
  }

  if (parsed.data.role && parsed.data.role.trim().length > 0) {
    return NextResponse.json({ ok: true });
  }

  if (!env.CONTACT_WEBHOOK_URL) {
    return NextResponse.json(
      { error: "Formulário sem destino configurado. Escreva para hello@contextaiq.com." },
      { status: 501 }
    );
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10_000);

  try {
    const { role: _honeypot, ...lead } = parsed.data;
    const response = await fetch(env.CONTACT_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(env.CONTACT_WEBHOOK_SECRET ? { "X-Contact-Secret": env.CONTACT_WEBHOOK_SECRET } : {}),
      },
      body: JSON.stringify({
        ...lead,
        receivedAt: new Date().toISOString(),
        source: "contextaiq.com",
      }),
      signal: controller.signal,
    });

    if (!response.ok) {
      return NextResponse.json({ error: "Falha no envio. Tente de novo." }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Falha no envio. Tente de novo." }, { status: 502 });
  } finally {
    clearTimeout(timeout);
  }
}
