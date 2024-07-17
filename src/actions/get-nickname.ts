import 'server-only';

import { cookies } from 'next/headers';

const getNicknameFromCookies = () => {
  return cookies().get('nextjs.session')?.value;
};

export default getNicknameFromCookies;
