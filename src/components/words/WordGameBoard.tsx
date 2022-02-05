import { useAppDispatch, useAppSelector } from '../../state/hooks';
import { setCategoryInputValues } from '../../state/reducers/local';

interface WordGameBoardProps {
  // categoriesValues: CategoryValues;
  // onCategoryValueChange: (category: string, value: string) => void;
}

const WordGameBoard: React.FC<WordGameBoardProps> = (
  {
    // categoriesValues,
    // onCategoryValueChange,
  }
) => {
  const game = useAppSelector((state) => state.gameSlice);
  const room = useAppSelector((state) => state.roomSlice);
  const categoryValues = useAppSelector(
    (state) => state.localSlice.categoryInputValues
  );
  const dispatch = useAppDispatch();

  return (
    <div className="game-board pt-10 sm:w-[65%] md:w-[70%] lg:w-[78%] overflow-y-scroll scrollbar pb-12">
      <h2 className="text-2xl text-right pr-10 mb-5 flex" dir="rtl">
        <p className="float-right">اكتب كلمات تبدأ بحرف:&nbsp; </p>
        <p className="char text-3xl bg-[#7adf99] w-12 h-12 relative -top-2 -left-2 rounded-full flex justify-center leading-[1.8] font-semibold float-right">
          {game.currentLetter}
        </p>
      </h2>

      <div className="inputs flex flex-wrap" dir="rtl">
        {room.options?.categories.map((category) => {
          // if (!categoriesValues[category]) {
          //   categoriesValues[category] = "";
          // }
          return (
            <div key={category} className="input m-4 mb-2">
              <p className="text-xl mb-3">{category}</p>
              <input
                type="text"
                placeholder={`${game.currentLetter} ......`}
                className="py-3 px-5 text-black rounded-3xl w-40 border-[2px] border-[#1a9c1a] focus:border-[#2a5c60] focus:border-[2px] focus:outline-0 placeholder:tracking-[0.2rem] transition-colors"
                value={categoryValues[category]}
                onChange={(e) =>
                  //onCategoryValueChange(category, e.target.value)
                  dispatch(
                    setCategoryInputValues({
                      ...categoryValues,
                      [category]: e.target.value,
                    })
                  )
                }
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WordGameBoard;
