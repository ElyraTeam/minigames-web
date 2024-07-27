import { FaCrown } from 'react-icons/fa';
import { RxCross2 } from 'react-icons/rx';

import { cn } from '@/lib/utils';
import useOwner from '@/hooks/use-owner';

interface WordPlayerRankProps {
  rank: number;
  isPlayer?: boolean;
  name?: string;
  score?: number;
  isOwner?: boolean;
  isLocalPlayer?: boolean;
  isOnline?: boolean;
  onKick?: () => void;
}

const WordPlayerRank: React.FC<WordPlayerRankProps> = ({
  rank,
  name,
  score,
  isOwner,
  isLocalPlayer,
  isOnline,
  onKick,
  isPlayer = true,
}) => {
  const isMeOwner = useOwner();
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
        <p className="text-lg overflow-hidden overflow-ellipsis max-w-[6.5rem] whitespace-nowrap font-semibold">
          {name || '------'}
        </p>
        {isOwner && (
          <span className="flex flex-col justify-center items-center bg-white w-5 h-5 rounded-full">
            <FaCrown className="text-sm text-yellow-500" />
          </span>
        )}
      </div>
      {isMeOwner && !isOwner && isPlayer && (
        <div
          className="p-[2px] text-sm bg-white/15 hover:bg-white/20 transition-colors rounded-full text-word-game-500 cursor-pointer mx-2"
          onClick={onKick}
        >
          <RxCross2 />
        </div>
      )}
      <div className="border-r-2 border-white/20 w-12 text-center" dir="ltr">
        <p className="font-semibold text-sm">{score || 0}</p>
      </div>
    </div>
  );
};

export default WordPlayerRank;
