import { NextResponse } from 'next/server';
import { createSession, verifyPassword } from '@/lib/auth';

export async function POST(req: Request) {
  const { password } = await req.json().catch(() => ({}));
  if (!verifyPassword(password)) {
    return NextResponse.json({ error: 'Mot de passe incorrect.' }, { status: 401 });
  }
  let token: string;
  try {
    token = await createSession();
  } catch {
    return NextResponse.json(
      { error: 'Configuration serveur incomplète : ajoutez la variable ADMIN_SECRET sur Vercel.' },
      { status: 500 }
    );
  }
  const r = NextResponse.json({ ok: true });
  r.cookies.set('salaam_admin', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 8,
  });
  return r;
}
