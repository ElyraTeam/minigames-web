'use client';

import { useState } from 'react';

import WordButton from '@/components/word/word-button';
import WordFeedback from '@/components/modals/word-feedback';

interface WordHomeContactProps {}

const WordHomeContact: React.FC<WordHomeContactProps> = ({}) => {
  const [isOpen, setOpen] = useState(false);

  return (
    <>
      <WordFeedback isOpen={isOpen} onOpenChange={(open) => setOpen(open)} />
      <WordButton
        variant="solid"
        className="
          w-full border-word-game-800 bg-transparent py-2
          hover:bg-white/10
        "
        onClick={() => setOpen(true)}
      >
        تواصل معنا
      </WordButton>
    </>
  );
};

export default WordHomeContact;
