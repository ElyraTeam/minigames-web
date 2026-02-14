'use client';

import { IoChatbubbles } from 'react-icons/io5';

import useChatStore from '@/state/chat';

import WordActionButton from '../word-action-button';

interface WordMobileBottomBarProps {}

const WordMobileBottomBar: React.FC<WordMobileBottomBarProps> = ({}) => {
  const isChatOpen = useChatStore((state) => state.isMobileChatOpen);
  const setMobileChatOpen = useChatStore((state) => state.setMobileChatOpen);
  const clearNewMessages = useChatStore((state) => state.clearNewMessages);
  const newMessages = useChatStore((state) => state.newMessages);

  const handleChatToggle = () => {
    const newState = !isChatOpen;
    setMobileChatOpen(newState);
    if (newState) {
      clearNewMessages();
    }
  };

  return (
    <footer className="lg:hidden fixed -bottom-px left-0 right-0 z-50">
      <div className="bg-word-side-400 rounded-t-[25px] shadow-[0px_-5px_16.8px_0px_rgba(0,0,0,0.25)] px-6 py-4">
        <div className="flex items-center justify-center gap-6">
          {/* Action Button */}
          <WordActionButton />

          {/* Vertical Divider */}
          <div className="w-[1px] h-8 bg-white/30" />

          {/* Chat Icon */}
          <button
            onClick={handleChatToggle}
            className="relative flex items-center justify-center size-[53px] rounded-full bg-word-game-850 shadow-[0px_4px_10px_0px_rgba(0,0,0,0.3)]"
          >
            <IoChatbubbles className="text-white text-2xl" />
            {!isChatOpen && newMessages !== 0 && (
              <div className="absolute flex items-center justify-center -top-1 -right-1 p-3 w-3 h-3 text-sm rounded-full bg-danger">
                {newMessages}
              </div>
            )}
          </button>
        </div>
      </div>
    </footer>
  );
};

export default WordMobileBottomBar;
