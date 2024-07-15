'use client';

import { FaHeart } from 'react-icons/fa';
import { useState, useEffect } from 'react';

import { shuffle } from '@/lib/utils';
import { CREDITS } from '@/config/constants';
import Overlay from '@/components/ui/overlay';
import AuthorText from '@/components/about/author-text';
import CreditsCard from '@/components/about/credits-card';

interface AuthorModalProps {}

const AuthorModal: React.FC<AuthorModalProps> = ({}) => {
  const [showCreds, setShowCreds] = useState(false);
  const [creds, setCredits] = useState<UserCredit[]>([]);

  const shuffleCredits = () => setCredits(shuffle(CREDITS));

  useEffect(() => {
    shuffleCredits();
  }, []);

  return (
    <>
      <p>
        صنع بالـ
        <FaHeart className="inline text-red-500" /> بواسطة فريق{' '}
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
