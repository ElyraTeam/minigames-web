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
    <div className="flex w-1/3 flex-col justify-end">
      <div
        className="
          flex h-52 min-h-14 w-full flex-col items-center justify-end gap-3
        "
        style={{ height: `${height}%` }}
      >
        <div className="flex gap-2">
          <WordRank rank={rank} />
          <p className="text-xl whitespace-nowrap">{name}</p>
        </div>
        <div
          className={cn(
            `
              flex h-full w-full animate-height flex-col items-center
              bg-yellow-500 py-3 transition-all
            `,
            rank === 1 &&
              'bg-linear-to-l from-yellow-600 to-white to-300% text-white',
            rank === 2 &&
              `
                rounded-bl-2xl bg-linear-to-l from-gray-500 to-white to-300%
                text-white
              `,
            rank === 3 &&
              `
                rounded-br-2xl bg-linear-to-l from-yellow-800 to-white to-300%
                text-white
              `
          )}
        >
          <h3 className="font-semibold">{score}</h3>
        </div>
      </div>
    </div>
  );
};

export default WordWinner;
