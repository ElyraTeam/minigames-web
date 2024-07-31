import WordButton from '@/components/word/word-button';

import WordCreateGame from './word-create-game';

interface WordHomeCreateCardProps {}

const WordHomeCreateCard: React.FC<WordHomeCreateCardProps> = ({}) => {
  return (
    <div className="flex flex-col items-center gap-20 justify-center border-2 border-word-game rounded-3xl py-20 px-12 w-80">
      <h2 className="font-bold">ابدأ اللعب</h2>
      <div className="space-y-3">
        <WordCreateGame />
        <WordButton
          variant="outline"
          className="text-lg rounded-2xl hover:bg-white/10"
        >
          جميع الغرف
        </WordButton>
      </div>
    </div>
  );
};

export default WordHomeCreateCard;
