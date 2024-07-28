'use client';

import { useState } from 'react';
import { MdOutlineChat } from 'react-icons/md';

import { cn } from '@/lib/utils';

import WordChatContainer from './word-chat-container';
import { RxCross2 } from 'react-icons/rx';

interface WordMobileChatProps {
  className?: string;
}

const WordMobileChat: React.FC<WordMobileChatProps> = ({ className }) => {
  const [isChatOpen, setChatOpen] = useState(false);

  return (
    <div
      className={cn(
        'fixed justify-end gap-3 flex flex-col bottom-0 left-0 p-6 z-50',
        isChatOpen && 'w-full h-full',
        className
      )}
    >
      {isChatOpen && <WordChatContainer className="flex-grow" />}
      <div
        className="flex self-end items-center justify-center w-14 h-14 p-4 bg-word-game-950 rounded-full cursor-pointer"
        onClick={() => setChatOpen(!isChatOpen)}
      >
        {isChatOpen ? (
          <RxCross2 className="text-3xl" />
        ) : (
          <MdOutlineChat className="text-3xl" />
        )}
      </div>
    </div>
  );
};

export default WordMobileChat;
