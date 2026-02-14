'use client';

import { useState, useEffect } from 'react';

import { cn } from '@/lib/utils';

import WordChatContainer from './word-chat-container';
import useChatStore from '@/state/chat';

interface WordMobileChatProps {
  className?: string;
}

const WordMobileChat: React.FC<WordMobileChatProps> = ({ className }) => {
  const isChatOpen = useChatStore((state) => state.isMobileChatOpen);
  const setChatOpen = useChatStore((state) => state.setMobileChatOpen);
  const [isClosing, setIsClosing] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isChatOpen) {
      setIsVisible(true);
      setIsClosing(false);
    }
  }, [isChatOpen]);

  const handleClickOutside = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  const handleClose = () => {
    setIsClosing(true);
  };

  const handleAnimationEnd = () => {
    if (isClosing) {
      setIsVisible(false);
      setIsClosing(false);
      setChatOpen(false);
    }
  };

  if (!isVisible) return null;

  return (
    <div
      className={cn(
        'fixed inset-0 z-[60] flex flex-col justify-end transition-colors duration-300',
        isClosing ? 'bg-black/0' : 'bg-black/60',
        className
      )}
      onClick={handleClickOutside}
    >
      <WordChatContainer
        className={cn(
          'h-[85%] rounded-t-[40px] duration-300',
          isClosing
            ? 'animate-out slide-out-to-bottom'
            : 'animate-in slide-in-from-bottom'
        )}
        onClose={handleClose}
        onAnimationEnd={handleAnimationEnd}
      />
    </div>
  );
};

export default WordMobileChat;
