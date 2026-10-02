import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

// ─── SECURITY CONFIG ───
// Change this password before deploying! Use a strong, unique password.
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "L@theesh2026!SecureAdmin#Portfolio";

// JWT secret - in production, use a cryptographically random value via env var
const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "portfolio-jwt-secret-change-in-production-2026"
);

const COOKIE_NAME = "portfolio_admin_token";
const TOKEN_EXPIRY = "8h";

// ─── PASSWORD VERIFICATION ───
// Using constant-time comparison to prevent timing attacks
export function verifyPassword(input: string): boolean {
  if (input.length !== ADMIN_PASSWORD.length) return false;
  let result = 0;
  for (let i = 0; i < input.length; i++) {
    result |= input.charCodeAt(i) ^ ADMIN_PASSWORD.charCodeAt(i);
  }
  return result === 0;
}

// ─── JWT TOKEN MANAGEMENT ───
export async function createToken(): Promise<string> {
  return new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(TOKEN_EXPIRY)
    .sign(JWT_SECRET);
}

export async function verifyToken(token: string): Promise<boolean> {
  try {
    await jwtVerify(token, JWT_SECRET);
    return true;
  } catch {
    return false;
  }
}

// ─── COOKIE MANAGEMENT ───
export async function setAuthCookie(token: string): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 8 * 60 * 60, // 8 hours
    path: "/",
  });
}

export async function getAuthCookie(): Promise<string | undefined> {
  const cookieStore = await cookies();
  return cookieStore.get(COOKIE_NAME)?.value;
}

export async function clearAuthCookie(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

// ─── AUTH CHECK ───
export async function isAuthenticated(): Promise<boolean> {
  const token = await getAuthCookie();
  if (!token) return false;
  return verifyToken(token);
}
