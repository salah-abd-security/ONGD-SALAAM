import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { createHash, timingSafeEqual } from 'crypto';

// Empreinte SHA-256 du mot de passe administrateur.
// Peut être remplacée sans toucher au code via la variable ADMIN_PASSWORD_HASH sur Vercel.
const DEFAULT_ADMIN_PASSWORD_HASH = '7f6e667ead5e1fde7824350722b1cc4bfff9a34fbf9c8a79d591c005ee069f34';

// Le secret est lu au moment de la requête (et non au chargement du module),
// sinon "next build" échoue pendant la collecte des pages.
function getSecret(): Uint8Array {
  const raw = process.env.ADMIN_SECRET;
  if (!raw) {
    if (process.env.NODE_ENV === 'production') throw new Error('ADMIN_SECRET manquant');
    return new TextEncoder().encode('local-development-secret-change-me');
  }
  return new TextEncoder().encode(raw);
}

export function verifyPassword(password: unknown): boolean {
  if (typeof password !== 'string' || password.length === 0) return false;
  const expectedHex = (process.env.ADMIN_PASSWORD_HASH || DEFAULT_ADMIN_PASSWORD_HASH).trim().toLowerCase();
  const expected = Buffer.from(expectedHex, 'hex');
  const actual = createHash('sha256').update(password, 'utf8').digest();
  return expected.length === actual.length && timingSafeEqual(expected, actual);
}

export async function createSession() {
  return new SignJWT({ admin: true })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('8h')
    .sign(getSecret());
}

export async function isAdmin() {
  try {
    const c = await cookies();
    const token = c.get('salaam_admin')?.value;
    if (!token) return false;
    await jwtVerify(token, getSecret());
    return true;
  } catch {
    return false;
  }
}
