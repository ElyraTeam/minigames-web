'use client';

import { useState } from 'react';
import { FiRefreshCw } from 'react-icons/fi';
import { useTranslations } from 'next-intl';

import localPlayer from '@/api/socket';
import useGameStore from '@/state/game';
import useLocalStore from '@/state/local';
import usePlayersStore from '@/state/players';
import ConfirmModal from '@/components/modals/confirm-modal';

const WordChangeLetterButton: React.FC = () => {
  const playerId = useLocalStore((state) => state.playerId);
  const players = usePlayersStore((state) => state.players?.players) || [];
  const currentLetter = useGameStore((state) => state.game?.currentLetter);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const t = useTranslations('WordGame');

  const currentPlayer = players.find((p) => p.id === playerId);
  const hasVoted = currentPlayer?.votedReroll ?? false;
  const votedCount = players.filter((p) => p.votedReroll).length;
  const totalPlayers = players.length;
  const hasVotes = votedCount > 0;

  const handleClick = () => {
    if (hasVoted) return;
    setConfirmOpen(true);
  };

  const handleConfirm = () => {
    localPlayer.reroll();
    setConfirmOpen(false);
  };

  return (
    <>
      <ConfirmModal
        isOpen={confirmOpen}
        onOpenChange={setConfirmOpen}
        subtitle={t('changeLetterConfirm', { letter: currentLetter })}
        confirmVariant="warning"
        onConfirm={handleConfirm}
      />
      <button
        onClick={handleClick}
        disabled={hasVoted}
        className={`
          flex h-10 items-center justify-center gap-2 rounded-full
          transition-all duration-300 ease-in-out
          ${hasVotes ? 'px-4' : 'w-10'}
          ${hasVoted ? 'cursor-not-allowed bg-yellow-400 opacity-70' : `
            cursor-pointer bg-yellow-300 shadow-md
            hover:bg-yellow-400
          `}
        `}
      >
        <FiRefreshCw className="text-lg text-white" />
        {hasVotes && (
          <span className="
            text-sm font-bold text-white duration-300 animate-in fade-in
          ">
            {votedCount}/{totalPlayers}
          </span>
        )}
      </button>
    </>
  );
};

export default WordChangeLetterButton;
