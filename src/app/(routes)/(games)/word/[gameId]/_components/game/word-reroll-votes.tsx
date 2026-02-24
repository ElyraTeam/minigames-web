'use client';

import { FiRefreshCw } from 'react-icons/fi';

import usePlayersStore from '@/state/players';

const WordRerollVotes: React.FC = () => {
  const players = usePlayersStore((state) => state.players?.players) || [];

  const votedCount = players.filter((p) => p.votedReroll).length;
  const totalPlayers = players.length;

  if (votedCount === 0) return null;

  return (
    <div
      className="
        fixed bottom-32 left-4 z-40 flex items-center gap-2 rounded-full
        border-2 border-yellow-300 bg-yellow-300/40 px-4 py-2 shadow-lg
        lg:bottom-4
      "
    >
      <FiRefreshCw className="text-lg text-white" />
      <span className="font-bold text-white">
        {votedCount}/{totalPlayers}
      </span>
    </div>
  );
};

export default WordRerollVotes;
