import { useAppSelector } from '../../state/hooks';

interface WordGameBoardProps { }

const WordGameBoard: React.FC<WordGameBoardProps> = () => {
  const game = useAppSelector((state) => state.gameSlice);
  const room = useAppSelector((state) => state.roomSlice);

  return (
    <div className="game-board pt-10 sm:w-[65%] md:w-[70%] lg:w-[78%] overflow-y-scroll scrollbar">
      <h2 className="text-2xl text-right pr-10 mb-5 flex" dir='rtl'>
        <p className='float-right'>اكتب كلمات تبدأ بحرف:&nbsp;{' '}</p>
        <p className="char text-3xl bg-[#7adf99] w-12 h-12 relative -top-2 -left-2 rounded-full flex justify-center font-semibold float-right">{game.currentLetter}</p>
      </h2>

      <div className="inputs flex flex-wrap" dir="rtl">
        {room.options?.categories.map((category) => (
          <div key={category} className="input m-4 mb-2">
            <p className="text-xl mb-3">{category}</p>
            <input
              type="text"
              placeholder={`${game.currentLetter} ......`}
              className="py-3 px-5 text-black rounded-3xl w-40 border-[1px] border-[#2a5c60] focus:border-[3px] focus:outline-0 placeholder:tracking-[0.2rem]"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default WordGameBoard;
