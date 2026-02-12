import { cookies } from "next/headers";

const COOKIE_NAME = "admin_session";
const SESSION_DURATION = 7 * 24 * 60 * 60 * 1000; // 7 days

export function isAuthenticated(): boolean {
  const cookieStore = cookies();
  const session = cookieStore.get(COOKIE_NAME);
  if (!session) return false;

  try {
    const data = JSON.parse(
      Buffer.from(session.value, "base64").toString("utf-8")
    );
    return data.authenticated === true && data.expires > Date.now();
  } catch {
    return false;
  }
}

export function createSession(): string {
  const payload = {
    authenticated: true,
    expires: Date.now() + SESSION_DURATION,
  };
  return Buffer.from(JSON.stringify(payload)).toString("base64");
}

export const COOKIE_OPTIONS = {
  name: COOKIE_NAME,
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  maxAge: SESSION_DURATION / 1000,
  path: "/",
};
