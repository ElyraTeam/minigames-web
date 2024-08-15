import { cn } from '@/lib/utils';

import WordRank from '../word-rank';

interface WordWinnerProps {
  name: string;
  score: number;
  rank: number;
  height: number;
}

const WordWinner: React.FC<WordWinnerProps> = ({
  name,
  score,
  rank,
  height,
}) => {
  return (
    <div className="flex flex-col justify-end w-1/3">
      <div
        className="flex flex-col gap-3 justify-end items-center w-full h-52 min-h-14"
        style={{ height: `${height}%` }}
      >
        <div className="flex gap-2">
          <WordRank rank={rank} />
          <p className="text-xl whitespace-nowrap">{name}</p>
        </div>
        <div
          className={cn(
            'w-full h-full bg-yellow-500 flex flex-col items-center transition-all animate-height py-3',
            rank === 1 &&
              'bg-gradient-to-l from-yellow-600 to-white to-[300%] text-white',
            rank === 2 &&
              'bg-gradient-to-l from-gray-500 to-white to-[300%] text-white rounded-bl-2xl',
            rank === 3 &&
              'bg-gradient-to-l from-yellow-800 to-white to-[300%] text-white rounded-br-2xl'
          )}
        >
          <h3 className="font-semibold">{score}</h3>
        </div>
      </div>
    </div>
  );
};

export default WordWinner;
