'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

import useLocalStore from '@/state/local';

interface NicknameProviderProps {
  children: React.ReactNode;
}

const NicknameProvider: React.FC<NicknameProviderProps> = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const nickname = useLocalStore((state) => state.nickname);
  const [isHydrated, setIsHydrated] = useState(false);

  // Wait for Zustand to hydrate from localStorage
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated) return;
    if (!nickname) {
      router.push(`/getstarted?next=${pathname}`);
    }
  }, [isHydrated, nickname, pathname, router]);

  return <>{children}</>;
};

export default NicknameProvider;
