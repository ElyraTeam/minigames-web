'use client';

import { useState, useEffect, useRef } from 'react';

import { cn } from '@/lib/utils';
import useMobileOverflow from '@/hooks/use-mobile-overflow';

import WordChatContainer from './word-chat-container';
import useChatStore from '@/state/chat';

interface WordMobileChatProps {
  className?: string;
}

const SWIPE_THRESHOLD = 100;

const WordMobileChat: React.FC<WordMobileChatProps> = ({ className }) => {
  const isChatOpen = useChatStore((state) => state.isMobileChatOpen);
  const setChatOpen = useChatStore((state) => state.setMobileChatOpen);
  const [isClosing, setIsClosing] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [swipeOffset, setSwipeOffset] = useState(0);
  const [isSwiping, setIsSwiping] = useState(false);
  const touchStartY = useRef(0);

  useMobileOverflow(isChatOpen);

  useEffect(() => {
    if (isChatOpen) {
      setIsVisible(true);
      setIsClosing(false);
      setSwipeOffset(0);
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

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
    setIsSwiping(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isSwiping) return;
    const deltaY = e.touches[0].clientY - touchStartY.current;
    // Only allow swiping down (positive direction)
    setSwipeOffset(Math.max(0, deltaY));
  };

  const handleTouchEnd = () => {
    if (swipeOffset > SWIPE_THRESHOLD) {
      handleClose();
    }
    setSwipeOffset(0);
    setIsSwiping(false);
  };

  if (!isVisible) return null;

  return (
    <div
      className={cn(
        `
          fixed inset-0 z-60 flex flex-col justify-end transition-colors
          duration-300
        `,
        isClosing ? 'bg-black/0' : 'bg-black/60',
        className
      )}
      onClick={handleClickOutside}
    >
      <WordChatContainer
        className={cn(
          'h-[85%] rounded-t-[40px]',
          !isSwiping && 'duration-300',
          isClosing
            ? 'animate-out slide-out-to-bottom'
            : 'animate-in slide-in-from-bottom'
        )}
        style={{
          transform: swipeOffset > 0 ? `translateY(${swipeOffset}px)` : undefined,
        }}
        onClose={handleClose}
        onAnimationEnd={handleAnimationEnd}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      />
    </div>
  );
};

export default WordMobileChat;
