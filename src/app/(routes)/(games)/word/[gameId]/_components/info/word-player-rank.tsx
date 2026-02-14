import { FaCrown } from 'react-icons/fa';
import { animated } from '@react-spring/web';
import { IoIosCloseCircle, IoIosCheckmarkCircle } from 'react-icons/io';

import { cn } from '@/lib/utils';
import useOwner from '@/hooks/use-owner';
import Tooltip from '@/components/ui/tooltip';

import WordRank from '../word-rank';

interface WordPlayerRankProps {
  rank: number;
  isPlayer?: boolean;
  name?: string;
  score?: number;
  isOwner?: boolean;
  isLocalPlayer?: boolean;
  isOnline?: boolean;
  checkmark?: boolean;
  checkmarkText?: string;
  style?: React.ComponentProps<typeof animated.div>['style'];
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
  style,
  checkmark,
  checkmarkText,
  isPlayer = true,
}) => {
  const isMeOwner = useOwner();
  const isOdd = rank % 2 == 1;

  return (
    <animated.div
      className={cn(
        'absolute flex w-full items-center px-4 py-5',
        isOdd && 'bg-word-secondary-700/15',
        isLocalPlayer && 'text-word-game',
        !isOnline && 'text-white/20'
      )}
      style={style}
    >
      <div className="flex grow items-center gap-2">
        <WordRank rank={rank} />
        <p
          className={cn(
            `
              max-w-32 overflow-hidden text-base font-semibold text-ellipsis
              whitespace-nowrap
            `,
            (isMeOwner || isOwner || checkmark) && 'max-w-30',
            ((isMeOwner && checkmark) || (isOwner && checkmark)) &&
              'max-w-22'
          )}
        >
          {name || '------'}
        </p>
        {isOwner && (
          <span className="
            flex h-5 w-5 flex-col items-center justify-center rounded-full
            bg-white
          ">
            <FaCrown className="text-sm text-yellow-500" />
          </span>
        )}
        {checkmark && (
          <Tooltip text={checkmarkText} position="top">
            <span className="
              text-xl text-word-game duration-500 animate-in fade-in
            ">
              <IoIosCheckmarkCircle />
            </span>
          </Tooltip>
        )}
      </div>
      {isMeOwner && !isOwner && isPlayer && (
        <IoIosCloseCircle
          className="
            mx-2 cursor-pointer text-2xl text-white/15 transition-colors
            hover:text-white/20
          "
          onClick={onKick}
        />
      )}
      <div className="w-12 border-r-2 border-white/20 text-center" dir="ltr">
        <p className="text-sm font-semibold">{score || 0}</p>
      </div>
    </animated.div>
  );
};

export default WordPlayerRank;
