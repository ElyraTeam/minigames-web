'use client';

import { useRef, useState } from 'react';
import { IoClose } from 'react-icons/io5';

import { cn } from '@/lib/utils';
import useMobileOverflow from '@/hooks/use-mobile-overflow';
import WordInfoTabList from '../info/word-info-tab-list';
import WordCurrentRound from '../info/word-current-round';
import WordFeedbackContainer from '../info/word-feedback-container';

interface WordMobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const SWIPE_THRESHOLD = 80;

const WordMobileSidebar: React.FC<WordMobileSidebarProps> = ({
  isOpen,
  onClose,
}) => {
  const [swipeOffset, setSwipeOffset] = useState(0);
  const [isSwiping, setIsSwiping] = useState(false);
  const touchStartX = useRef(0);

  useMobileOverflow(isOpen);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    setIsSwiping(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isSwiping) return;
    const deltaX = e.touches[0].clientX - touchStartX.current;
    // Only allow swiping right (positive direction)
    setSwipeOffset(Math.max(0, deltaX));
  };

  const handleTouchEnd = () => {
    if (swipeOffset > SWIPE_THRESHOLD) {
      onClose();
    }
    setSwipeOffset(0);
    setIsSwiping(false);
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          `
            fixed inset-0 z-60 bg-black/50
            lg:hidden
          `,
          'transition-opacity duration-300',
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        )}
        onClick={onClose}
      />

      {/* Sidebar */}
      <div
        className={cn(
          `
            fixed top-0 right-0 bottom-0 z-70 w-[85%] max-w-[320px]
            lg:hidden
          `,
          'bg-linear-to-b from-[#233f61] to-[#0f223a]',
          'flex flex-col overflow-hidden',
          'shadow-[-4px_0_20px_rgba(0,0,0,0.3)]',
          !isSwiping && 'transition-transform duration-300 ease-out',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
        style={{
          transform: isOpen ? `translateX(${swipeOffset}px)` : undefined,
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Fixed Header */}
        <div className="relative shrink-0">
          <button
            onClick={onClose}
            className="
              absolute top-2 right-2 z-10 flex size-10 items-center
              justify-center rounded-full text-white/60 transition-colors
              hover:bg-white/20
            "
          >
            <IoClose className="text-3xl" />
          </button>
          <WordCurrentRound />
        </div>

        {/* Tab List - grows to fill remaining space with internal scrolling */}
        <WordInfoTabList />

        {/* Footer */}
        <WordFeedbackContainer />
      </div>
    </>
  );
};

export default WordMobileSidebar;
