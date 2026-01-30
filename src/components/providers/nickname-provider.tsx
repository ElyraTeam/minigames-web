'use client';

import { useEffect, useState } from 'react';

import useLocalStore from '@/state/local';
import NicknameModal from '@/components/modals/nickname-modal';

interface NicknameProviderProps {
  children: React.ReactNode;
}

const NicknameProvider: React.FC<NicknameProviderProps> = ({ children }) => {
  const nickname = useLocalStore((state) => state.nickname);
  const showNicknameModal = useLocalStore((state) => state.showNicknameModal);
  const setShowNicknameModal = useLocalStore(
    (state) => state.setShowNicknameModal
  );
  const [isHydrated, setIsHydrated] = useState(false);

  // Wait for Zustand to hydrate from localStorage
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated) return;
    if (!nickname) {
      setShowNicknameModal(true);
    }
  }, [isHydrated, nickname, setShowNicknameModal]);

  return (
    <>
      {children}
      <NicknameModal isOpen={showNicknameModal} />
    </>
  );
};

export default NicknameProvider;
