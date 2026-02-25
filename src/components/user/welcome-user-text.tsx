'use client';

import { useTranslations } from 'next-intl';

import useLocalStore from '@/state/local';

import UsernameText from './username-text';

interface WelcomeUserTextProps {}

const WelcomeUserText: React.FC<WelcomeUserTextProps> = ({}) => {
  const t = useTranslations('WordHome');
  const setShowNicknameModal = useLocalStore(
    (state) => state.setShowNicknameModal
  );

  return (
    <h1 className="
      text-3xl
      lg:text-5xl
    ">
      {t('welcome')} <UsernameText />!
      <button
        onClick={() => setShowNicknameModal(true)}
        className="
          cursor-pointer px-2 text-lg
          hover:text-word-primary
          sm:text-xl
        "
      >
        {t('change')}
      </button>
    </h1>
  );
};

export default WelcomeUserText;
