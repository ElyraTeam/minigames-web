import { State } from '@/types/word';
import localPlayer from '@/api/socket';

import WordGameButton from '../word-game-button';

interface WordDoneButtonProps {
  state: State;
}

const WordDoneButton: React.FC<WordDoneButtonProps> = ({ state }) => {
  const handleDoneButton = () => {
    if (state === State.INGAME) return localPlayer.finishRound();
    return localPlayer.confirmVotes();
  };

  return <WordGameButton onClick={handleDoneButton}>انتهيت</WordGameButton>;
};

export default WordDoneButton;
