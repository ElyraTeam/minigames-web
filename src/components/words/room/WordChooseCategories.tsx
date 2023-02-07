import { FaTimes } from 'react-icons/fa';

interface WordChooseCategoriesProps {
  categories: string[];
  categoryClick: (cat: string) => void;
  categoryError?: string | null;
}

const WordChooseCategories: React.FC<WordChooseCategoriesProps> = ({
  categories,
  categoryClick,
  categoryError,
}) => {
  return (
    <div>
      <div className="categories flex flex-wrap" dir="rtl">
        {categories.map((category) => {
          return (
            <div
              key={categories.indexOf(category)}
              className="relative transition-all py-3 px-8 mx-2 my-2 text-lg bg-white text-[#000] rounded-3xl flex justify-center items-center shadow-[0_4px_8px_0_rgba(0,0,0,0.3)] w-50"
            >
              <FaTimes
                className="absolute -top-1 -right-1 bg-[#f00] text-white text-[1.6rem] rounded-3xl p-1 cursor-pointer"
                onClick={() => categoryClick(category)}
              />
              {category}
            </div>
          );
        })}
      </div>
      {categoryError && (
        <p className="text-[#f00] mt-4 font-semibold">{categoryError}</p>
      )}
    </div>
  );
};

export default WordChooseCategories;
