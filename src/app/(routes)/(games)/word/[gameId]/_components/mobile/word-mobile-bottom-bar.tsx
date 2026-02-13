'use client';

import { IoChatbubbles, IoClose } from 'react-icons/io5';

import { cn } from '@/lib/utils';
import { State } from '@/types/word';
import localPlayer from '@/api/socket';
import useOwner from '@/hooks/use-owner';
import useChatStore from '@/state/chat';
import useGameStore from '@/state/game';
import useVoteStore from '@/state/vote';
import useLocalStore from '@/state/local';
import usePlayersStore from '@/state/players';
import useCurrentPlayer from '@/hooks/use-current-player';

interface WordMobileBottomBarProps {}

const WordMobileBottomBar: React.FC<WordMobileBottomBarProps> = ({}) => {
  const nickname = useLocalStore((state) => state.nickname);
  const players = usePlayersStore((state) => state.players?.players);
  const playersLength = players?.length || 0;
  const numberOfReadyPlayers = players?.filter((player) => player.ready).length;
  const allReady = numberOfReadyPlayers === playersLength;
  const localReady = players?.some((p) => p.ready && p.nickname === nickname);
  const isOwner = useOwner();
  const isChatOpen = useChatStore((state) => state.isMobileChatOpen);
  const setMobileChatOpen = useChatStore((state) => state.setMobileChatOpen);
  const clearNewMessages = useChatStore((state) => state.clearNewMessages);
  const newMessages = useChatStore((state) => state.newMessages);

  // Game state
  const game = useGameStore((state) => state.game);
  const gameState = game?.state;
  const currentPlayer = useCurrentPlayer();
  const myVotes = useVoteStore((state) => state.myVotes);
  const myVotesLength = Object.keys(myVotes).length;
  const votedCount = useVoteStore((state) => state.voteCount);

  const handleChatToggle = () => {
    const newState = !isChatOpen;
    setMobileChatOpen(newState);
    if (newState) {
      clearNewMessages();
    }
  };

  const handleButtonClick = () => {
    if (!gameState || gameState === State.LOBBY) {
      if (isOwner) {
        localPlayer.startRound();
      } else {
        localPlayer.ready();
      }
      return;
    }
    if (gameState === State.INGAME) {
      localPlayer.finishRound();
      return;
    }
    if (gameState === State.VOTING) {
      if (myVotesLength >= playersLength - 1) {
        localPlayer.confirmVotes();
      }
      return;
    }
    if (gameState === State.GAME_OVER) {
      if (isOwner) {
        localPlayer.resetGame();
      }
      return;
    }
  };

  const isDisabled = () => {
    if (!gameState || gameState === State.LOBBY) {
      return localReady && (!allReady || !isOwner || playersLength === 1);
    }
    if (gameState === State.INGAME) {
      return false;
    }
    if (gameState === State.VOTING) {
      return myVotesLength < playersLength - 1 || currentPlayer?.voted;
    }
    if (gameState === State.GAME_OVER) {
      return !isOwner;
    }
    return false;
  };

  const renderText = () => {
    // LOBBY state
    if (!gameState || gameState === State.LOBBY) {
      if (!isOwner) {
        if (localReady) {
          if (allReady) return 'بانتظار المنشئ..';
          return 'مستعدون';
        }
        return 'مستعد';
      }
      if (playersLength === 1) return 'بانتظار اللاعبين..';
      if (!allReady) return 'مستعدون';
      return 'ابدأ الجولات!';
    }
    // INGAME state
    if (gameState === State.INGAME) {
      return 'انتهيت';
    }
    // VOTING state
    if (gameState === State.VOTING) {
      if (myVotesLength < playersLength - 1) return 'صوت أولًا';
      if (currentPlayer?.voted) {
        return (
          <span>
            <span>{votedCount}</span>
            <span className="opacity-50">/{playersLength}</span>
          </span>
        );
      }
      return 'تأكيد';
    }
    // GAME_OVER state
    if (gameState === State.GAME_OVER) {
      return isOwner ? 'اعادة اللعبة' : 'بانتظار المنشئ';
    }
    return '';
  };

  return (
    <footer className="lg:hidden fixed -bottom-px left-0 right-0 z-50">
      <div className="bg-word-side-400 rounded-t-[25px] shadow-[0px_-5px_16.8px_0px_rgba(0,0,0,0.25)] px-6 py-4">
        <div className="flex items-center justify-center gap-6">
          {/* Action Button */}
          <div className={cn('relative', isDisabled() && 'opacity-70')}>
            <div className="absolute inset-x-0 bottom-0 top-3 bg-word-game-700 rounded-[14px]" />
            <button
              onClick={handleButtonClick}
              disabled={isDisabled()}
              className={cn(
                'relative w-[182px] py-2.5 rounded-[13px] font-semibold text-lg text-white',
                'bg-gradient-to-r from-word-game-600 to-[#46c46c]',
                'active:translate-y-[3px]',
                'transition-all',
                'disabled:cursor-not-allowed'
              )}
            >
              {renderText()}
            </button>
          </div>

          {/* Vertical Divider */}
          <div className="w-[1px] h-8 bg-white/30" />

          {/* Chat Icon */}
          <button
            onClick={handleChatToggle}
            className="relative flex items-center justify-center size-[53px] rounded-full bg-word-game-850 shadow-[0px_4px_10px_0px_rgba(0,0,0,0.3)]"
          >
            {isChatOpen ? (
              <IoClose className="text-white text-3xl" />
            ) : (
              <IoChatbubbles className="text-white text-2xl" />
            )}
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
