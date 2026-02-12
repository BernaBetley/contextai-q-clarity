import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { audits } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { inngest } from "@/lib/inngest/client";

const intakeSchema = z.object({
  clientName: z.string().min(1),
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

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const [audit] = await db
    .select()
    .from(audits)
    .where(eq(audits.id, params.id));

  if (!audit) {
    return NextResponse.json({ error: "Audit not found" }, { status: 404 });
  }

  if (audit.status !== "intake_pending" && audit.status !== "payment_received") {
    return NextResponse.json(
      { error: "Intake already completed" },
      { status: 400 }
    );
  }

  const body = await request.json();
  const parsed = intakeSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  await db
    .update(audits)
    .set({
      ...parsed.data,
      clientEmail: audit.clientEmail ?? parsed.data.clientName,
      status: "intake_complete",
      intakeCompletedAt: new Date(),
    })
    .where(eq(audits.id, params.id));

  // Trigger the pipeline
  await inngest.send({
    name: "audit/intake.completed",
    data: { auditId: params.id },
  });

  return NextResponse.json({ status: "Pipeline started" });
}
