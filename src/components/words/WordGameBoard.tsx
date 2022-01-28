import { useAppSelector } from '../../state/hooks';

interface WordGameBoardProps {}

const WordGameBoard: React.FC<WordGameBoardProps> = () => {
  const game = useAppSelector((state) => state.gameSlice);
  const room = useAppSelector((state) => state.roomSlice);

  return (
    <div className="game-board pt-10 w-[78%] overflow-y-scroll scrollbar">
      <h2 className="text-2xl text-right pr-10">
        اكتب كلمات تبدأ بحرف:&nbsp;{' '}
        <span className="char text-3xl">{game.currentLetter}</span>
      </h2>

      <div className="inputs flex flex-wrap" dir="rtl">
        {room.options?.categories.map((category) => (
          <div key={category} className="input m-4 mb-2">
            <p className="text-xl mb-3">{category}</p>
            <input
              type="text"
              placeholder={`${game.currentLetter} ......`}
              className="py-3 px-5 text-black rounded-3xl w-40 border border-[#447e83] focus:border-2 focus:outline-0 placeholder:tracking-[0.2rem]"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default WordGameBoard;
