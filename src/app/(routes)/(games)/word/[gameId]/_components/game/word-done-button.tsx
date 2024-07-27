import { State } from '@/types/word';
import localPlayer from '@/api/socket';

import useVoteStore from '@/state/vote';
import usePlayersStore from '@/state/players';
import useCurrentPlayer from '@/hooks/use-current-player';

import WordGameButton from '../word-game-button';

interface WordDoneButtonProps {
  state: State;
}

const WordDoneButton: React.FC<WordDoneButtonProps> = ({ state }) => {
  const currentPlayer = useCurrentPlayer();
  const myVotes = useVoteStore((state) => state.myVotes);
  const myVotesLength = Object.keys(myVotes).length;
  const votedCount = useVoteStore((state) => state.voteCount);
  const playersLength = (
    usePlayersStore((state) => state.players?.players) || []
  ).length;

  const handleDoneButton = () => {
    if (state === State.INGAME) return localPlayer.finishRound();
    if (myVotesLength >= playersLength - 1) {
      return localPlayer.confirmVotes();
    }
  };

  const isDisabled = () => {
    if (state === State.INGAME) return false;
    return myVotesLength < playersLength - 1 || currentPlayer?.voted;
  };

  const renderButtonText = () => {
    if (state === State.VOTING) {
      if (myVotesLength < playersLength - 1) return 'صوت أولًا';
      if (currentPlayer?.voted)
        return (
          <div>
            <p className="leading-none font-bold text-lg mb-1">
              <span className="leading-5">{`${votedCount}`}</span>
              <span className="opacity-50">{`/${playersLength}`}</span>
            </p>
            <p className="text-xs leading-none">تم التصويت</p>
          </div>
        );
    }
    return 'انتهيت';
  };

  return (
    <WordGameButton onClick={handleDoneButton} disabled={isDisabled()}>
      {renderButtonText()}
    </WordGameButton>
  );
};

export default WordDoneButton;
