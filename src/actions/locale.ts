'use server';

import { cookies } from 'next/headers';

export async function setLocale(locale: string) {
  const cookieStore = await cookies();
  cookieStore.set('locale', locale, { path: '/' });
}
