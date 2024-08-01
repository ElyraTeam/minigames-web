'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';

import useLocalStore from '@/state/local';

interface NicknameProviderProps {
  children: React.ReactNode;
}

const NicknameProvider: React.FC<NicknameProviderProps> = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const nickname = useLocalStore((state) => state.nickname);
  const setNickname = useLocalStore((state) => state.setNickname);

  useEffect(() => {
    if (!nickname) return router.push(`/getstarted?next=${pathname}`);
    setNickname(nickname);
  }, [nickname, pathname, router, setNickname]);

  return <>{children}</>;
};

export default NicknameProvider;
