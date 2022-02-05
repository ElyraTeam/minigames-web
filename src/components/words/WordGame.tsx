import localPlayer from '../../api/socket';
import WordContent from './shared/WordContent';
import WordGameBoard from './WordGameBoard';
import WordSidebar from './WordSidebar';

interface WordGameProps {}

const WordGame: React.FC<WordGameProps> = ({}) => {
  return (
    <div>
      <WordContent className="lg:flex">
        <div className="game-board-main h-[384px] flex relative">
          <WordSidebar />
          <WordGameBoard />
        </div>
      </WordContent>
      <button
        className="finish-button bg-[#1a8b90] hover:bg-[#12595c] text-white py-2 px-5 rounded-3xl ml-4"
        onClick={() => localPlayer.finishRound()}
      >
        !انتهيت
      </button>
    </div>
  );
};

export default WordGame;
