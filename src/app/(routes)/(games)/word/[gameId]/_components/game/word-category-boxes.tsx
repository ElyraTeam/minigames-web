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
    <div className="grid grid-cols-2 py-6 px-16 gap-x-12 gap-y-6 overflow-y-auto scrollbar-thin">
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
