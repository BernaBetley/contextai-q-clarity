import { NextRequest, NextResponse } from "next/server";
import { createSession, COOKIE_OPTIONS } from "@/lib/auth";

export async function POST(request: NextRequest) {
  const { password } = await request.json();

  if (password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  }

  const sessionToken = createSession();
  const response = NextResponse.json({ success: true });

  response.cookies.set({
    ...COOKIE_OPTIONS,
    value: sessionToken,
  });

  return response;
}
