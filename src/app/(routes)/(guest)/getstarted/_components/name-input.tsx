'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import useLocalStore from '@/state/local';
import { saveSession } from '@/services/local';
import SlideButton from '@/components/ui/slide-button';

interface NameInputProps {}

const NameInput: React.FC<NameInputProps> = ({}) => {
  const router = useRouter();
  const [newName, setNewName] = useState<string>('');
  const { nickname, setNickname } = useLocalStore();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setNewName(nickname);
  }, [nickname]);

  async function updateNickname() {
    if (loading) return false;
    setLoading(true);
    if (!newName || newName.trim().length == 0) return setLoading(false);
    try {
      setNickname(newName);
      await saveSession(newName);
      window.location.href = '/word';
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
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
      />
    </SlideButton>
  );
};

export default NameInput;
