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
    <footer className="
      fixed right-0 -bottom-px left-0 z-50
      lg:hidden
    ">
      <div className="
        rounded-t-[25px] bg-word-side-400 px-6 py-4
        shadow-[0px_-5px_16.8px_0px_rgba(0,0,0,0.25)]
      ">
        <div className="flex items-center justify-center gap-6">
          {/* Action Button */}
          <WordActionButton />

          {/* Vertical Divider */}
          <div className="h-8 w-px bg-white/30" />

          {/* Chat Icon */}
          <button
            onClick={handleChatToggle}
            className="
              relative flex size-[53px] items-center justify-center rounded-full
              bg-word-game-850 shadow-[0px_4px_10px_0px_rgba(0,0,0,0.3)]
            "
          >
            <IoChatbubbles className="text-2xl text-white" />
            {!isChatOpen && newMessages !== 0 && (
              <div className="
                absolute -top-1 -right-1 flex h-3 w-3 items-center
                justify-center rounded-full bg-danger p-3 text-sm
              ">
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
