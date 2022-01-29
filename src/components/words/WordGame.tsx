import WordChat from "./WordChat";
import WordGameBoard from "./WordGameBoard";

interface WordGameProps {
  messages: ChatMessage[];
}

const WordGame: React.FC<WordGameProps> = ({ messages }) => {
  return (
    <div className="game-board-main h-[384px] flex relative">
      <WordChat messages={messages} />
      <WordGameBoard />
    </div>
  );
};

export default WordGame;
