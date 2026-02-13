'use client';

import { useEffect } from 'react';
import { IoClose } from 'react-icons/io5';

import { cn } from '@/lib/utils';
import WordInfoTabList from '../info/word-info-tab-list';
import WordCurrentRound from '../info/word-current-round';
import WordFeedbackContainer from '../info/word-feedback-container';

interface WordMobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const WordMobileSidebar: React.FC<WordMobileSidebarProps> = ({
  isOpen,
  onClose,
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          'lg:hidden fixed inset-0 bg-black/50 z-[60]',
          'transition-opacity duration-300',
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
        onClick={onClose}
      />

      {/* Sidebar */}
      <div
        className={cn(
          'lg:hidden fixed top-0 right-0 bottom-0 w-[85%] max-w-[320px] z-[70]',
          'bg-gradient-to-b from-[#233f61] to-[#0f223a]',
          'transform transition-transform duration-300 ease-out',
          'flex flex-col overflow-hidden',
          'shadow-[-4px_0_20px_rgba(0,0,0,0.3)]',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        {/* Fixed Header */}
        <div className="relative flex-shrink-0">
          <button
            onClick={onClose}
            className="absolute top-2 right-2 z-10 flex items-center justify-center size-10 rounded-full text-white/60 hover:bg-white/20 transition-colors"
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
