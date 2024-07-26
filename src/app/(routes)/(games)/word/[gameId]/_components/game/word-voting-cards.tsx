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

  return (
    <div className="flex flex-wrap gap-12 p-12 overflow-y-auto scrollbar-thin">
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
