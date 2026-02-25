import { useTranslations } from 'next-intl';

import { State } from '@/types/word';
import localPlayer from '@/api/socket';

import useVoteStore from '@/state/vote';
import useRoomStore from '@/state/room';
import useLocalStore from '@/state/local';
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
  const categories = useRoomStore((state) => state.options?.options?.categories) || [];
  const categoryInputValues = useLocalStore((state) => state.categoryInputValues);
  const t = useTranslations('WordGame');

  const handleDoneButton = () => {
    if (state === State.INGAME) return localPlayer.finishRound();
    if (myVotesLength >= playersLength - 1) {
      return localPlayer.confirmVotes();
    }
  };

  const isDisabled = () => {
    if (state === State.INGAME) {
      const allCategoriesFilled = categories.every(
        (category) => (categoryInputValues[category]?.length ?? 0) >= 2
      );
      return !allCategoriesFilled;
    }
    return myVotesLength < playersLength - 1 || currentPlayer?.voted;
  };

  const renderButtonText = () => {
    if (state === State.VOTING) {
      if (myVotesLength < playersLength - 1) return t('voteFirst');
      if (currentPlayer?.voted)
        return (
          <p className="text-xl leading-none font-bold">
            <span className="leading-5">{`${votedCount}`}</span>
            <span className="opacity-50">{`/${playersLength}`}</span>
          </p>
        );
    }
    return t('done');
  };

  return (
    <WordGameButton onClick={handleDoneButton} disabled={isDisabled()}>
      {renderButtonText()}
    </WordGameButton>
  );
};

export default WordDoneButton;
