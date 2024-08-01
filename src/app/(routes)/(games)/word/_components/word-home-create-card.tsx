import WordCreateGame from './word-create-game';
import WordPublicRoomsButton from './word-public-rooms-button';

interface WordHomeCreateCardProps {}

const WordHomeCreateCard: React.FC<WordHomeCreateCardProps> = ({}) => {
  return (
    <div className="flex flex-col items-center gap-16 lg:gap-20 justify-center border-2 border-word-game rounded-3xl py-16 lg:py-20 px-12 w-80">
      <h2 className="font-bold">ابدأ اللعب</h2>
      <div className="space-y-3">
        <WordCreateGame />
        <WordPublicRoomsButton />
      </div>
    </div>
  );
};

export default WordHomeCreateCard;
