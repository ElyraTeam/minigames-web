import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import { NEXTJS_SESSION_KEY } from '@/config/constants';

export async function POST(req: Request) {
  const { nickname }: { nickname: any } = await req.json();
  if (!nickname || typeof nickname !== 'string' || nickname.length == 0)
    return NextResponse.json({ success: false }, { status: 400 });
  const cookieStore = await cookies();
  cookieStore.set(NEXTJS_SESSION_KEY, nickname, { path: '/' });
  return NextResponse.json({ success: true }, { status: 200 });
}
