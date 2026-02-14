'use client';

import { useState } from 'react';
import { MdMenu } from 'react-icons/md';

import { cn } from '@/lib/utils';
import WordAppbarButtons from './word-appbar-buttons';

interface WordAppbarMobileProps {}

const WordAppbarMobile: React.FC<WordAppbarMobileProps> = ({}) => {
  const [isOpen, setOpen] = useState(false);
  const [isClosing, setClosing] = useState(false);

  const handleOpen = () => {
    const newOpen = !isOpen;
    if (newOpen) {
      document.body.classList.add('!overflow-y-hidden', 'lg:!overflow-y-auto');
      setOpen(newOpen);
    } else {
      document.body.classList.remove(
        '!overflow-y-hidden',
        'lg:!overflow-y-auto'
      );
      setClosing(true);
      setTimeout(() => {
        setOpen(newOpen);
        setClosing(false);
      }, 100);
    }
  };

  return (
    <div className="sm:hidden">
      <MdMenu className="cursor-pointer text-3xl" onClick={handleOpen} />
      <div
        className={cn(
          `
            absolute top-20 right-0 z-9999 flex h-screen w-screen flex-col
            items-center gap-3 bg-word-home p-12 animate-in
            slide-in-from-left-full
          `,
          isClosing && 'animate-out slide-out-to-left-full',
          !isOpen && 'hidden'
        )}
      >
        <WordAppbarButtons />
      </div>
    </div>
  );
};

export default WordAppbarMobile;
