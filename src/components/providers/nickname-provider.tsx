'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';

import useLocalStore from '@/state/local';

interface NicknameProviderProps {
  nickname?: string;
  children: React.ReactNode;
}

const NicknameProvider: React.FC<NicknameProviderProps> = ({
  nickname,
  children,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const setNickname = useLocalStore((state) => state.setNickname);

  useEffect(() => {
    if (!nickname) return router.push(`/getstarted?next=${pathname}`);
    setNickname(nickname);
  }, [nickname, pathname, router, setNickname]);

  return <>{children}</>;
};

export default NicknameProvider;
