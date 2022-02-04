import { FaPlusSquare } from 'react-icons/fa';

interface WordAddCategoryProps {
  newCategory: string;
  onChange: (cat: string) => void;
  addCategory: (e?: React.KeyboardEvent) => void;
}

const WordAddCategory: React.FC<WordAddCategoryProps> = ({
  newCategory,
  addCategory,
  onChange,
}) => {
  return (
    <div
      className="add-category mt-8 relative inline-block text-white"
      dir="rtl"
    >
      <input
        type="text"
        placeholder="أضف فئة"
        className="bg-transparent mr-2 border-0 border-b-2 border-b-[#eee] p-2 text-right text-white placeholder:text-white focus:outline-none text-lg focus:border-b-light transition-[border]"
        maxLength={15}
        value={newCategory}
        onKeyPress={(e) => addCategory(e)}
        onChange={(input) => onChange(input.target.value)}
      />
      <FaPlusSquare
        className="absolute top-2 left-2 rounded-full text-2xl cursor-pointer"
        onClick={() => addCategory()}
      />
    </div>
  );
};

export default WordAddCategory;
