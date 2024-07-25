import { State } from '@/types/word';

import WordGameButton from '../word-game-button';

interface WordDoneButtonProps {
  state: State;
}

const WordDoneButton: React.FC<WordDoneButtonProps> = ({ state }) => {
  return <WordGameButton>انتهيت</WordGameButton>;
};

export default WordDoneButton;
