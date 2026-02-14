import useGameStore from '@/state/game';

import WordCategoryBoxes from './word-category-boxes';
import WordContentHeader from '../word-content-header';
import WordGameContainer from '../word-game-container';

interface WordGameProps {}

const WordGame: React.FC<WordGameProps> = ({}) => {
  const game = useGameStore((state) => state.game);

  return (
    <WordGameContainer className='space-y-8'>
      <WordContentHeader>
        <div className="flex items-center justify-center text-xl lg:text-2xl">
          <p>اكتب كلمات تبدأ بحرف الـ{' '}</p>
          <div className="flex items-center justify-center bg-word-side/20 w-12 h-12 rounded-full px-4 py-1 text-xl lg:text-2xl mx-1">
            {game?.currentLetter}
          </div>
        </div>
      </WordContentHeader>
      <WordCategoryBoxes />
    </WordGameContainer>
  );
};

export default WordGame;
