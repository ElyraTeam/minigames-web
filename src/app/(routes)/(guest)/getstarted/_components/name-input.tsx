'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import useLocalStore from '@/state/local';
import SlideButton from '@/components/ui/slide-button';

interface NameInputProps {}

const NameInput: React.FC<NameInputProps> = ({}) => {
  const router = useRouter();
  const [newName, setNewName] = useState<string>('');
  const { nickname, setNickname } = useLocalStore();

  useEffect(() => {
    setNewName(nickname);
  }, [nickname]);

  function updateNickname() {
    console.log(newName);
    if (!newName || newName.trim().length == 0) return;
    setNickname(newName);

    // TODO: fix next route
    // if (nextRoute) {
    //   router.replace(nextRoute);
    //   dispatch(setNextRoute(''));
    // } else {
    //   router.replace(`/`);
    // }

    router.replace('/word');
  }

  return (
    <SlideButton
      onInputTextChange={setNewName}
      center
      label="ابدأ اللعب"
      initialValue={nickname}
      onKeyPress={(k) => k == 'Enter' && updateNickname()}
      placeholderLabel="اكتب اسمك"
    >
      <Image
        onClick={updateNickname}
        src="/svg/send.svg"
        width="25"
        height="25"
        alt="send-icon"
        // className="translate-x-0 group-hover:translate-x-20 transition-transform duration-500"
      />
    </SlideButton>
  );
};

export default NameInput;
