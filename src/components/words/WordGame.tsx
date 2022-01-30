import WordChat from "./WordChat";
import WordGameBoard from "./WordGameBoard";
import WordSidebar from "./WordSidebar";

interface WordGameProps {}

const WordGame: React.FC<WordGameProps> = ({}) => {
  return (
    <div className="game-board-main h-[384px] flex relative">
      <WordChat />
      <WordGameBoard />
    </div>
  );
};

export default WordGame;
