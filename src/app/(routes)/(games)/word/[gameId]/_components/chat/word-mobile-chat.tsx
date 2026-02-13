'use client';

import { RxCross2 } from 'react-icons/rx';
import { MdOutlineChat } from 'react-icons/md';

import { cn } from '@/lib/utils';

import WordChatContainer from './word-chat-container';
import useChatStore from '@/state/chat';

interface WordMobileChatProps {
  className?: string;
}

const WordMobileChat: React.FC<WordMobileChatProps> = ({ className }) => {
  const isChatOpen = useChatStore((state) => state.isMobileChatOpen);
  const setChatOpen = useChatStore((state) => state.setMobileChatOpen);
  const clearNewMessages = useChatStore((state) => state.clearNewMessages);
  const newMessages = useChatStore((state) => state.newMessages);

  const handleClickOutside = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (e.target === e.currentTarget) {
      handleChatOpen(false);
    }
  };

  const handleChatOpen = (open: boolean) => {
    setChatOpen(open);
    if (open) {
      clearNewMessages();
    }
  };

  return (
    <div
      className={cn(
        'fixed justify-end gap-3 flex flex-col bottom-0 left-0 p-6 z-50',
        isChatOpen && 'w-full h-full',
        isChatOpen && 'bg-black/60',
        className
      )}
      onClick={handleClickOutside}
    >
      {isChatOpen && (
        <WordChatContainer
          className={cn(
            'flex-grow animate-in slide-in-from-bottom-1/2 duration-300'
          )}
        />
      )}
      <div
        className="relative flex self-end items-center justify-center w-14 h-14 p-4 bg-word-game-950 rounded-full cursor-pointer shadow-xl"
        onClick={() => handleChatOpen(!isChatOpen)}
      >
        {isChatOpen ? (
          <RxCross2 className="text-3xl" />
        ) : (
          <MdOutlineChat className="text-3xl" />
        )}
        {newMessages !== 0 && (
          <div className="absolute flex items-center justify-center -top-1 -right-1 p-3 w-3 h-3 text-sm rounded-full bg-danger">
            {newMessages}
          </div>
        )}
      </div>
    </div>
  );
};

export default WordMobileChat;
