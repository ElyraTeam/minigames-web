import { useEffect, useRef, useState } from 'react';

import { cn } from '@/lib/utils';
import localPlayer from '@/api/socket';
import useVoteStore from '@/state/vote';
import { getPlayerById } from '@/lib/word';
import usePlayersStore from '@/state/players';
import { Vote, WordSound } from '@/config/word';
import useWordSound from '@/hooks/use-word-sound';
import useCurrentPlayer from '@/hooks/use-current-player';

import WordVotingCard from './word-voting-card';

interface WordVotingCardsProps {}

const WordVotingCards: React.FC<WordVotingCardsProps> = ({}) => {
  const players = usePlayersStore((state) => state.players?.players) || [];
  const currentPlayer = useCurrentPlayer();
  const categoryData = useVoteStore((state) => state.categoryVoteData);
  const myVotes = useVoteStore((state) => state.myVotes);
  const [fade, setFade] = useState(false);
  const cardsRef = useRef<HTMLDivElement>(null);
  const currentCategoryIndex = useRef(categoryData?.categoryIndex ?? 0);
  const [playBetweenVotes] = useWordSound(WordSound.BETWEEN_VOTES);
  const allVotes = Object.keys(categoryData?.values || {}).sort((a, b) => {
    if (a === currentPlayer?.id) return 1;
    if (b === currentPlayer?.id) return -1;
    else return 0;
  });

  const handleChangeVote = (playerId: string, vote: Vote) => {
    if (currentPlayer?.voted) return;
    const value = categoryData?.values[playerId];
    if (!value || !currentPlayer || playerId === currentPlayer.id) return;
    const newVotes = { ...myVotes, [playerId]: vote };
    localPlayer.sendVotes(newVotes);
  };

  const getVote = (playerId: string): Vote | undefined => {
    if (playerId === currentPlayer?.id) return;
    const value = categoryData?.values[playerId];
    if (!value || value.length <= 1) return 0;
    return myVotes[playerId];
  };

  useEffect(() => {
    cardsRef.current?.scrollTo({ top: 0 });
    if (
      !categoryData ||
      categoryData.categoryIndex === 0 ||
      currentCategoryIndex.current === categoryData.categoryIndex
    )
      return;
    currentCategoryIndex.current = categoryData.categoryIndex;
    // Fade when new category is being voted on
    playBetweenVotes();
    setFade(true);
    const timeout = setTimeout(() => {
      setFade(false);
    }, 300);
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryData]);

  return (
    <div
      className={cn(
        'flex flex-wrap justify-center gap-6 py-8 px-8 overflow-y-auto scrollbar-thin animate-in fade-in duration-500',
        fade && 'animate-out fade-out'
      )}
      ref={cardsRef}
    >
      {allVotes.map((playerId) => (
        <WordVotingCard
          key={`word-voting-card-player-${playerId}-${categoryData?.category}`}
          playerId={playerId}
          name={getPlayerById(players, playerId)?.nickname || 'N/A'}
          value={categoryData?.values[playerId] || '------'}
          onChangeVote={(vote) => handleChangeVote(playerId, vote)}
          vote={getVote(playerId)}
          selectedCard={currentPlayer?.id === playerId}
          voted={currentPlayer?.voted}
          hasValue={!!categoryData?.values[playerId]}
        />
      ))}
    </div>
  );
};

export default WordVotingCards;
