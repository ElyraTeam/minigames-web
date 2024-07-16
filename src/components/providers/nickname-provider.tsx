'use client';

import { useEffect } from 'react';

import useLocalStore from '@/state/local';

interface NicknameProviderProps {
  nickname: string;
  children: React.ReactNode;
}

const NicknameProvider: React.FC<NicknameProviderProps> = ({
  nickname,
  children,
}) => {
  const setNickname = useLocalStore((state) => state.setNickname);

  useEffect(() => {
    setNickname(nickname);
  }, [nickname, setNickname]);

  return <>{children}</>;
};

export default NicknameProvider;
