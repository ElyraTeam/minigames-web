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

const AuthorModal: React.FC<AuthorModalProps> = ({ className, children }) => {
  const [showCreds, setShowCreds] = useState(false);
  const [creds, setCredits] = useState<UserCredit[]>([]);

  const shuffleCredits = () => setCredits(shuffle(CREDITS));

  useEffect(() => {
    shuffleCredits();
  }, []);

  return (
    <>
      <p className={cn(className)}>
        {children}{' '}
        <AuthorText
          onClick={() => {
            setShowCreds((oldShow) => {
              const show = !oldShow;
              if (show) {
                shuffleCredits();
              }
              return show;
            });
          }}
        />
      </p>
      <Modal
        className="w-[25rem] sm:w-[30rem]"
        isOpen={showCreds}
        onClose={() => setShowCreds(false)}
      >
        <CreditsList credits={creds} />
        <WordButton
          variant="text"
          className="py-2 text-md self-center w-fit"
          onClick={() => setShowCreds(false)}
        >
          إغلاق
        </WordButton>
      </Modal>
    </>
  );
};

export default AuthorModal;
