import { FaCrown } from 'react-icons/fa';

import { cn } from '@/lib/utils';

interface WordPlayerRankProps {
  rank: number;
  name?: string;
  score?: number;
  isOwner?: boolean;
  isLocalPlayer?: boolean;
  isOnline?: boolean;
}

const WordPlayerRank: React.FC<WordPlayerRankProps> = ({
  rank,
  name,
  score,
  isOwner,
  isLocalPlayer,
  isOnline,
}) => {
  const isOdd = rank % 2 == 1;

  return (
    <div
      className={cn(
        'py-5 px-4 flex items-center',
        isOdd && 'bg-word-secondary-700/15',
        isLocalPlayer && 'text-word-game',
        !isOnline && 'text-white/20'
      )}
    >
      <div className="flex items-center gap-3 flex-grow">
        <p
          className={cn(
            'w-6 h-6 rounded-full text-center text-white/80',
            rank == 1 &&
              'bg-gradient-to-r from-yellow-600 to-white to-[200%] text-white',
            rank == 2 &&
              'bg-gradient-to-r from-gray-500 to-white to-[200%] text-white',
            rank == 3 &&
              'bg-gradient-to-r from-yellow-800 to-white to-[200%] text-white'
          )}
        >
          {rank}
        </p>
        <p className="text-lg overflow-hidden overflow-ellipsis max-w-[6.8rem] whitespace-nowrap font-semibold">
          {name || '------'}
        </p>
        {isOwner && (
          <span className="flex flex-col justify-center items-center bg-white w-5 h-5 rounded-full">
            <FaCrown className="text-sm text-yellow-500" />
          </span>
        )}
      </div>
      <div className="border-r-2 border-white/20 w-12 text-center" dir="ltr">
        <p className="font-semibold text-sm">{score || 0}</p>
      </div>
    </div>
  );
};

export default WordPlayerRank;
