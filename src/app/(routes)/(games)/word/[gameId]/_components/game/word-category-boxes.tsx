import useRoomStore from '@/state/room';
import useGameStore from '@/state/game';

import WordCategoryBox from './word-category-box';

interface WordCategoryBoxesProps {}

const WordCategoryBoxes: React.FC<WordCategoryBoxesProps> = ({}) => {
  const categories =
    useRoomStore((state) => state.options?.options?.categories) || [];
  const letter = useGameStore((state) => state.game?.currentLetter) || '';

  return (
    <div className="grid grid-cols-2 py-6 px-16 gap-x-12 gap-y-6 overflow-y-auto scrollbar-thin">
      {categories.map((category) => (
        <WordCategoryBox
          key={`word-category-box-${category}`}
          label={category}
          letter={letter}
        />
      ))}
    </div>
  );
};

export default WordCategoryBoxes;
