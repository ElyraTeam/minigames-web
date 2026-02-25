import { useTranslations } from 'next-intl';

import useGameStore from '@/state/game';

import WordCategoryBoxes from './word-category-boxes';
import WordContentHeader from '../word-content-header';
import WordGameContainer from '../word-game-container';
import WordChangeLetterButton from './word-change-letter-button';

interface WordGameProps {}

const WordGame: React.FC<WordGameProps> = ({}) => {
  const t = useTranslations('WordGame');
  const game = useGameStore((state) => state.game);

  return (
    <WordGameContainer className="space-y-8">
      <WordContentHeader>
        <div
          className="
            flex items-center justify-center gap-1 text-xl
            lg:text-2xl
          "
        >
          <p>{t('wordsStartWith')} </p>
          <div
            className="
              mx-1 flex h-16 items-center justify-center gap-3 rounded-full
              bg-word-side/10 px-6 py-3
            "
          >
            <span className="
              text-2xl
              lg:text-3xl
            ">{game?.currentLetter}</span>
            <WordChangeLetterButton />
          </div>
        </div>
      </WordContentHeader>
      <WordCategoryBoxes />
    </WordGameContainer>
  );
};

export default WordGame;
