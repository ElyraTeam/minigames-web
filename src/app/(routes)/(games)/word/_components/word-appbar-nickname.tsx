'use client';

import toast from 'react-hot-toast';
import { IoPerson } from 'react-icons/io5';
import { useState } from 'react';
import { useTranslations } from 'next-intl';

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/ui/popover';
import Input from '@/components/ui/input';
import useLocalStore from '@/state/local';
import Button from '@/components/ui/button';
import LanguageSelect from '@/components/ui/language-select';
import { MAX_NICKNAME_LENGTH, MIN_NICKNAME_LENGTH } from '@/config/constants';

import WordNickname from './word-nickname';

interface WordAppbarNicknameProps {}

const WordAppbarNickname: React.FC<WordAppbarNicknameProps> = ({}) => {
  const t = useTranslations('WordAppbar');
  const nickname = useLocalStore((state) => state.nickname);
  const setNickname = useLocalStore((state) => state.setNickname);
  const [open, setOpen] = useState(false);
  const [newNickname, setNewNickname] = useState('');

  const handleOpenChange = (isOpen: boolean) => {
    if (isOpen) setNewNickname(nickname || '');
    setOpen(isOpen);
  };

  const handleSaveNickname = () => {
    const newName = newNickname.trim();
    if (
      !newName ||
      newName.length < MIN_NICKNAME_LENGTH ||
      newName.length > MAX_NICKNAME_LENGTH
    )
      return;
    setNickname(newName);
    toast.success(t('nicknameUpdated'));
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger
        className="
          flex w-full items-center justify-center space-x-1 rounded-xl
          border-none bg-word-game-800 px-1 py-2
          shadow-[inset_0_0_10px_rgba(0,0,0,0.5)] transition-colors
          hover:bg-word-game-800/80
          rtl:space-x-reverse
        "
      >
        <IoPerson className="inline text-lg" />
        <WordNickname />
      </PopoverTrigger>
      <PopoverContent
        sideOffset={16}
        className="
          z-99999 flex w-56 flex-col justify-center gap-4 rounded-2xl
          border-none bg-white text-center
        "
      >
        <div className="flex items-center justify-between">
          <p>{t('settings')}</p>
          <LanguageSelect size="sm" />
        </div>
        <Input
          placeholder={t('enterName')}
          className="
            w-full rounded-2xl
            focus:border-word-game
          "
          value={newNickname}
          maxLength={MAX_NICKNAME_LENGTH}
          onChange={(e) => setNewNickname(e.target.value)}
        />
        <Button
          className="
            w-[60%] self-center bg-word-game-700 py-1 text-base
            hover:bg-word-game-700/90
            disabled:bg-word-game-700/40
          "
          onClick={handleSaveNickname}
        >
          {t('save')}
        </Button>
      </PopoverContent>
    </Popover>
  );
};

export default WordAppbarNickname;
