import { NextResponse } from "next/server";
import { isAuthenticated, createToken, setAuthCookie } from "@/lib/auth";

export async function GET() {
  const authenticated = await isAuthenticated();
  if (authenticated) {
    const token = await createToken();
    await setAuthCookie(token);
  }
  return NextResponse.json({ authenticated });
}
