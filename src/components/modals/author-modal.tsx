'use client';

import { useState, useEffect } from 'react';

import { cn, shuffle } from '@/lib/utils';
import { CREDITS } from '@/config/constants';
import WordButton from '@/components/word/word-button';
import AuthorText from '@/components/about/author-text';
import CreditsList from '@/components/about/credits-list';

import Modal from './modal';

interface AuthorModalProps {
  className?: string;
  children?: React.ReactNode;
}

const AuthorModal: React.FC<AuthorModalProps> = ({ children }) => {
  const [showCreds, setShowCreds] = useState(false);
  const [creds, setCredits] = useState<UserCredit[]>([]);

  const shuffleCredits = () => setCredits(shuffle(CREDITS));

  useEffect(() => {
    shuffleCredits();
  }, []);

  const handleCreditsOpen = () => {
    setShowCreds(true);
  };

  return (
    <>
      <div className="cursor-pointer" onClick={handleCreditsOpen}>
        {children}
      </div>
      <Modal
        className="w-[25rem] sm:w-[30rem]"
        isOpen={showCreds}
        onOpenChange={(open) => setShowCreds(open)}
      >
        <CreditsList credits={creds} />
      </Modal>
    </>
  );
};

export default AuthorModal;
