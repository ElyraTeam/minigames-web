'use client';

import { IoGameController } from 'react-icons/io5';

import { cn } from '@/lib/utils';
import useUIStore from '@/state/ui';
import usePlayersStore from '@/state/players';
import WordLogo from '@/components/word/word-logo';

import WordGameIcons from '../word-game-icons';
import WordMobileSidebar from './word-mobile-sidebar';

interface WordMobileHeaderProps {}

const WordMobileHeader: React.FC<WordMobileHeaderProps> = ({}) => {
  const newPlayersCount = usePlayersStore((state) => state.newPlayersCount);
  const clearNewPlayers = usePlayersStore((state) => state.clearNewPlayers);
  const sidebarOpen = useUIStore((state) => state.playersSidebarOpen);
  const setSidebarOpen = useUIStore((state) => state.setPlayersSidebarOpen);

  const handlePlayersClick = () => {
    setSidebarOpen(true);
    clearNewPlayers();
  };

  return (
    <>
      <WordMobileSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <header
        className="
        fixed top-0 right-0 left-0 z-40 h-[115px]
        lg:hidden
      "
      >
        {/* Background layers */}
        <div
          className="
          absolute inset-0 rounded-b-2xl bg-word-side-400
          shadow-[0px_5px_16.8px_0px_rgba(0,0,0,0.25)]
        "
        />
        <div
          className="
          absolute inset-0 bottom-[16px] rounded-b-xl bg-word-side-200
        "
        />

        {/* Content */}
        <div
          className="
          relative flex items-center justify-between px-4 pt-5 pb-4
        "
        >
          {/* Left side: Players button */}
          <button
            onClick={handlePlayersClick}
            className={cn(
              'relative flex items-center gap-1.5',
              'border-2 border-word-side-100 bg-word-side-100/10',
              'rounded-full px-3 py-1.5',
              `
                transition-colors
                hover:bg-word-side-100/20
              `,
            )}
          >
            <IoGameController className="text-lg text-white" />
            <span className="text-base text-white">اللاعبون</span>
            {!sidebarOpen && newPlayersCount > 0 && (
              <div
                className="
                absolute -top-1 -right-1 flex size-5 items-center justify-center
                rounded-full bg-danger text-xs text-white
              "
              >
                {newPlayersCount}
              </div>
            )}
          </button>

          {/* Right side: Icon buttons + Logo */}
          <div
            className="
            flex flex-1 items-center justify-evenly
            sm:flex-none sm:justify-end sm:gap-3
          "
          >
            <WordGameIcons />
            <WordLogo size={60} />
          </div>
        </div>
      </header>
    </>
  );
};

export default WordMobileHeader;
