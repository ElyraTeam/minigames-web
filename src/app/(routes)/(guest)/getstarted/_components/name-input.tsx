'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

import useLocalStore from '@/state/local';
import SlideButton from '@/components/ui/slide-button';
import { MAX_NICKNAME_LENGTH, MIN_NICKNAME_LENGTH } from '@/config/constants';

interface NameInputProps {}

const NameInput: React.FC<NameInputProps> = ({}) => {
  const [newName, setNewName] = useState<string | null | undefined>(null);
  const { nickname, setNickname } = useLocalStore();
  const [loading, setLoading] = useState(false);
  const params = useSearchParams();

  useEffect(() => {
    setNewName(nickname);
  }, [nickname]);

  function updateNickname() {
    if (loading) return false;
    setLoading(true);
    if (
      !newName ||
      newName.trim().length < MIN_NICKNAME_LENGTH ||
      newName.trim().length > MAX_NICKNAME_LENGTH
    )
      return setLoading(false);
    setNickname(newName.trim());
    const nextUrl = params.get('next');
    if (nextUrl && nextUrl.trim().length !== 0) {
      window.location.href = nextUrl;
    } else {
      window.location.href = '/word';
    }
    setLoading(false);
  }

  return (
    <SlideButton
      onInputTextChange={setNewName}
      center
      label="اكتب اسمك"
      initialValue={nickname || ''}
      onKeyPress={(k) => k == 'Enter' && updateNickname()}
      placeholderLabel="اكتب اسمك"
      className="w-[250px]"
      maxLength={MAX_NICKNAME_LENGTH}
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
