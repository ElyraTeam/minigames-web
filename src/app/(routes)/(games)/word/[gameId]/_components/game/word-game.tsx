import useGameStore from '@/state/game';

import WordCategoryBoxes from './word-category-boxes';
import WordContentHeader from '../word-content-header';

interface WordGameProps {}

const WordGame: React.FC<WordGameProps> = ({}) => {
  const game = useGameStore((state) => state.game);

  return (
    <>
      <WordContentHeader>
        <p className="text-2xl">
          اكتب كلمات تبدأ بحرف الـ{' '}
          <span className="bg-word-game/50 rounded-2xl px-4 py-1 text-2xl mx-1 font-black shadow-inner">
            {game?.currentLetter}
          </span>
        </p>
      </WordContentHeader>
      <WordCategoryBoxes />
    </>
  );
};

export default WordGame;
