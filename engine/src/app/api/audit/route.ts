import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { audits } from "@/lib/db/schema";
import { desc } from "drizzle-orm";

const createSchema = z.object({
  clientName: z.string().min(1),
  clientEmail: z.string().email(),
  companyName: z.string().min(1),
  companyWebsite: z.string().url(),
  industry: z.string().min(1),
  companyDescription: z.string().min(10),
  targetAudience: z.string().min(1),
  competitors: z
    .array(z.object({ name: z.string().min(1), website: z.string().url() }))
    .length(3),
  factSheet: z.string().min(10),
  priorityTopics: z.string().optional(),
  additionalContext: z.string().optional(),
});

// POST: Create audit manually (admin)
export async function POST(request: NextRequest) {
  const adminPassword = request.headers.get("x-admin-password");
  if (adminPassword !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const parsed = createSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const [audit] = await db
    .insert(audits)
    .values({
      status: "intake_complete",
      ...parsed.data,
    })
    .returning();

  return NextResponse.json({ audit });
}

// GET: List all audits (admin)
export async function GET(request: NextRequest) {
  const adminPassword = request.headers.get("x-admin-password");
  if (adminPassword !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const allAudits = await db
    .select({
      id: audits.id,
      status: audits.status,
      companyName: audits.companyName,
      clientEmail: audits.clientEmail,
      overallScore: audits.overallScore,
      createdAt: audits.createdAt,
      completedAt: audits.completedAt,
    })
    .from(audits)
    .orderBy(desc(audits.createdAt));

  return NextResponse.json({ audits: allAudits });
}
