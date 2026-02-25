'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';

import { createRoom } from '@/api/rooms';
import useLocalStore from '@/state/local';
import Button3D from '@/components/ui/button-3d';
import {
  CHARS_ARABIC,
  CHARS_ENGLISH,
  DEFAULT_CATEGORIES_ARABIC,
  DEFAULT_CATEGORIES_ENGLISH,
  DEFAULT_CHARS_NUMBER,
} from '@/config/word';

interface WordCreateGameProps {}

const WordCreateGame: React.FC<WordCreateGameProps> = ({}) => {
  const t = useTranslations('WordHome');
  const locale = useLocale();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const nickname = useLocalStore((state) => state.nickname);
  const savedGameSettings = useLocalStore((state) => state.savedGameSettings);

  const createGame = async () => {
    if (!nickname) {
      return toast.error(t('noNickname'));
    }
    setLoading(true);
    try {
      const defaultLetters = (
        locale === 'ar' ? CHARS_ARABIC : CHARS_ENGLISH
      ).slice(0, DEFAULT_CHARS_NUMBER);
      const defaultCategories =
        locale === 'ar' ? DEFAULT_CATEGORIES_ARABIC : DEFAULT_CATEGORIES_ENGLISH;
      const options = {
        ...(savedGameSettings.maxPlayers && {
          maxPlayers: savedGameSettings.maxPlayers,
        }),
        ...(savedGameSettings.rounds && { rounds: savedGameSettings.rounds }),
        letters:
          savedGameSettings.lettersByLanguage?.[locale] ?? defaultLetters,
        categories:
          savedGameSettings.categoriesByLocale?.[locale] ?? defaultCategories,
      };
      const res = await createRoom(nickname, options);
      if (res.error) {
        toast.error(res.error);
        setLoading(false);
        return;
      }
      if (!res.roomId) {
        toast.error('Room ID not found.');
        setLoading(false);
        return;
      }
      router.push(`/word/${res.roomId}`);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  return (
    <Button3D
      className="
        self-center rounded-2xl bg-word-game-950
        disabled:bg-word-game-950
      "
      frontClassName={
        'from-word-game-800 to-word-game-900 to-[200%] text-base rounded-2xl -translate-y-[8px] group-active:-translate-y-[3px] group-disabled:-translate-y-[5px] h-[50px] py-2 group-disabled:from-word-game-800 group-disabled:to-word-game-900 group-disabled:to-[800%] px-4 content-center'
      }
      onClick={createGame}
      loading={loading}
    >
      {t('createRoom')}
    </Button3D>
  );
};

export default WordCreateGame;
