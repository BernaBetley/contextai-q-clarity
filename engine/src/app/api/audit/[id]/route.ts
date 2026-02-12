import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { audits } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

// GET: Audit detail (admin or by audit ID for client)
export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  const [audit] = await db
    .select()
    .from(audits)
    .where(eq(audits.id, params.id));

  if (!audit) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({ audit });
}
