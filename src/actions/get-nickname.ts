import 'server-only';

import { cookies } from 'next/headers';

import { NEXTJS_SESSION_KEY } from '@/config/constants';

const getNicknameFromCookies = async () => {
  const cookieStore = await cookies();
  return cookieStore.get(NEXTJS_SESSION_KEY)?.value;
};

export default getNicknameFromCookies;
