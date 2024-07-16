import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { nickname }: { nickname: any } = await req.json();
  if (!nickname || typeof nickname !== 'string' || nickname.length == 0)
    return NextResponse.json({ success: false }, { status: 400 });
  const cookieStore = cookies();
  cookieStore.set('nextjs.session', nickname, { path: '/' });
  return NextResponse.json({ success: true }, { status: 200 });
}
