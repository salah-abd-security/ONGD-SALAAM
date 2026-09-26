import { cookies } from "next/headers"
import { createHash, timingSafeEqual } from "node:crypto"
import { SignJWT, jwtVerify } from "jose"

const COOKIE_NAME = "salaam_admin_session"
const SESSION_DURATION = 60 * 60 * 8 // 8 hours (seconds)

// SHA-256 hash of the administrator password. The plaintext password is never
// stored — the login input is hashed and compared to this value. It can be
// overridden with the ADMIN_PASSWORD_HASH environment variable.
const DEFAULT_ADMIN_PASSWORD_HASH =
  "7f6e667ead5e1fde7824350722b1cc4bfff9a34fbf9c8a79d591c005ee069f34"

function getSecretKey(): Uint8Array {
  const secret = process.env.ADMIN_SECRET || "salaam-development-only-secret-change-me"
  return new TextEncoder().encode(secret)
}

function sha256Hex(value: string): string {
  return createHash("sha256").update(value, "utf8").digest("hex")
}

export function isAdminConfigured(): boolean {
  return Boolean(process.env.ADMIN_PASSWORD_HASH || DEFAULT_ADMIN_PASSWORD_HASH || process.env.ADMIN_PASSWORD)
}

export function verifyPassword(password: string): boolean {
  if (!password) return false

  // Primary: compare the SHA-256 hash of the submitted password.
  const expectedHash = (process.env.ADMIN_PASSWORD_HASH || DEFAULT_ADMIN_PASSWORD_HASH).toLowerCase()
  if (expectedHash) {
    const providedHash = sha256Hex(password)
    const a = Buffer.from(providedHash, "hex")
    const b = Buffer.from(expectedHash, "hex")
    if (a.length === b.length && timingSafeEqual(a, b)) return true
  }

  // Fallback: allow a plaintext ADMIN_PASSWORD if one is configured.
  const plaintext = process.env.ADMIN_PASSWORD
  if (plaintext && password === plaintext) return true

  return false
}

export async function createSession(): Promise<void> {
  const token = await new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_DURATION}s`)
    .sign(getSecretKey())

  const cookieStore = await cookies()
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_DURATION,
  })
}

export async function destroySession(): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.delete(COOKIE_NAME)
}

export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies()
  const token = cookieStore.get(COOKIE_NAME)?.value
  if (!token) return false
  try {
    await jwtVerify(token, getSecretKey())
    return true
  } catch {
    return false
  }
}
