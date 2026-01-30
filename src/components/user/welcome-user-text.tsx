'use client';

import useLocalStore from '@/state/local';

import UsernameText from './username-text';

interface WelcomeUserTextProps {}

const WelcomeUserText: React.FC<WelcomeUserTextProps> = ({}) => {
  const setShowNicknameModal = useLocalStore(
    (state) => state.setShowNicknameModal
  );

  return (
    <h1 className="text-3xl lg:text-5xl">
      مرحبا <UsernameText />!
      <button
        onClick={() => setShowNicknameModal(true)}
        className="text-lg sm:text-xl px-2 cursor-pointer hover:text-word-primary"
      >
        (تغيير)
      </button>
    </h1>
  );
};

export default WelcomeUserText;
