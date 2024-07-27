import { useEffect, useRef } from 'react';

import { Vote } from '@/config/word';
import localPlayer from '@/api/socket';
import useVoteStore from '@/state/vote';
import { getPlayerById } from '@/lib/word';
import usePlayersStore from '@/state/players';
import useCurrentPlayer from '@/hooks/use-current-player';

import WordVotingCard from './word-voting-card';

interface WordVotingCardsProps {}

const WordVotingCards: React.FC<WordVotingCardsProps> = ({}) => {
  const players = usePlayersStore((state) => state.players?.players) || [];
  const currentPlayer = useCurrentPlayer();
  const categoryData = useVoteStore((state) => state.categoryVoteData);
  const myVotes = useVoteStore((state) => state.myVotes);
  const cardsRef = useRef<HTMLDivElement>(null);

  const handleChangeVote = (playerId: string, vote: Vote) => {
    const value = categoryData?.values[playerId];
    if (!value || !currentPlayer || playerId === currentPlayer.id) return;
    const newVotes = { ...myVotes, [playerId]: vote };
    localPlayer.sendVotes(newVotes);
  };

  const getVote = (playerId: string): Vote | undefined => {
    if (playerId === currentPlayer?.id) return;
    const value = categoryData?.values[playerId];
    if (!value) return 0;
    return myVotes[playerId];
  };

  useEffect(() => {
    cardsRef.current?.scrollTo({ top: 0 });
  }, [categoryData]);

  return (
    <div
      className="flex justify-center items-center flex-wrap gap-6 py-8 px-3 overflow-y-auto scrollbar-thin"
      ref={cardsRef}
    >
      {Object.keys(categoryData?.values || {}).map((playerId) => (
        <WordVotingCard
          key={`word-voting-card-player-${playerId}-${categoryData?.category}`}
          playerId={playerId}
          name={getPlayerById(players, playerId)?.nickname || 'N/A'}
          value={categoryData?.values[playerId] || '------'}
          onChangeVote={(vote) => handleChangeVote(playerId, vote)}
          vote={getVote(playerId)}
          selectedCard={currentPlayer?.id === playerId}
        />
      ))}
    </div>
  );
};

export default WordVotingCards;
