'use client';

import { useEffect } from 'react';
import { useCookies } from 'next-client-cookies';
import { usePathname, useRouter } from 'next/navigation';

import useLocalStore from '@/state/local';
import { NEXTJS_SESSION_KEY } from '@/config/constants';

interface NicknameProviderProps {
  children: React.ReactNode;
}

const NicknameProvider: React.FC<NicknameProviderProps> = ({ children }) => {
  const router = useRouter();
  const cookies = useCookies();
  const pathname = usePathname();
  const setNickname = useLocalStore((state) => state.setNickname);

  useEffect(() => {
    if (!cookies) return;
    const nickname = cookies.get(NEXTJS_SESSION_KEY);
    if (!nickname) return router.push(`/getstarted?next=${pathname}`);
  }, [cookies, pathname, router, setNickname]);

  return <>{children}</>;
};

export default NicknameProvider;
