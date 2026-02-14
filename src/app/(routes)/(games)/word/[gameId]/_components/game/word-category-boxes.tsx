import useRoomStore from '@/state/room';
import useGameStore from '@/state/game';
import useLocalStore from '@/state/local';

import WordCategoryBox from './word-category-box';

interface WordCategoryBoxesProps {}

const WordCategoryBoxes: React.FC<WordCategoryBoxesProps> = ({}) => {
  const categories =
    useRoomStore((state) => state.options?.options?.categories) || [];
  const letter = useGameStore((state) => state.game?.currentLetter) || '';
  const categoryValues = useLocalStore((state) => state.categoryInputValues);
  const setCategoryValues = useLocalStore(
    (state) => state.setCategoryInputValues
  );

  const handleChangeCategory = (category: string, value: string) => {
    setCategoryValues({ ...categoryValues, [category]: value });
  };

  return (
    <div className="
      scrollbar-thin grid grid-cols-1 gap-x-6 gap-y-4 overflow-y-auto
      duration-500 animate-in fade-in
      lg:grid-cols-2 lg:gap-x-12 lg:gap-y-6
    ">
      {categories.map((category) => (
        <WordCategoryBox
          key={`word-category-box-${category}`}
          label={category}
          letter={letter}
          value={categoryValues[category] || ''}
          onChange={(value) => handleChangeCategory(category, value)}
        />
      ))}
    </div>
  );
};

export default WordCategoryBoxes;
