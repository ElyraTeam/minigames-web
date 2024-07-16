'use client';

import { useState, useEffect } from 'react';

import { cn, shuffle } from '@/lib/utils';
import { CREDITS } from '@/config/constants';
import Overlay from '@/components/ui/overlay';
import AuthorText from '@/components/about/author-text';
import CreditsCard from '@/components/about/credits-card';

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
      <CreditsCard
        showCredits={showCreds}
        credits={creds}
        onClose={() => setShowCreds(false)}
      />
      {showCreds && (
        <Overlay
          onClick={() => {
            setShowCreds(false);
          }}
        />
      )}
    </>
  );
};

export default AuthorModal;
