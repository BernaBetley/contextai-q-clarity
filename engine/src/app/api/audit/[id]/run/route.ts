import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { audits } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { inngest } from "@/lib/inngest/client";

// POST: Manually trigger (or re-trigger) the pipeline (admin only)
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const adminPassword = request.headers.get("x-admin-password");
  if (adminPassword !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const [audit] = await db
    .select()
    .from(audits)
    .where(eq(audits.id, params.id));

  if (!audit) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  if (!audit.companyName || !audit.companyDescription) {
    return NextResponse.json(
      { error: "Intake not complete — fill company details first" },
      { status: 400 }
    );
  }

  // Trigger the pipeline
  await inngest.send({
    name: "audit/intake.completed",
    data: { auditId: params.id },
  });

  return NextResponse.json({ status: "Pipeline triggered" });
}
