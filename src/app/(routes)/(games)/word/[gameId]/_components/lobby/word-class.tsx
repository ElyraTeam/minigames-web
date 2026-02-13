import { IoClose } from 'react-icons/io5';
import { animated } from '@react-spring/web';

import { cn } from '@/lib/utils';
import useOwner from '@/hooks/use-owner';

interface WordClassProps {
  name: string;
  style?: React.ComponentProps<typeof animated.div>['style'];
  onDelete: () => void;
}

const WordClass: React.FC<WordClassProps> = ({ name, style, onDelete }) => {
  const isOwner = useOwner();

  return (
    <animated.div className="overflow-hidden" style={style}>
      <div className="relative pt-2 pr-2">
        {/* Delete button */}
        {isOwner && (
          <button
            className={cn(
              'absolute top-0 right-0 z-10',
              'flex items-center justify-center',
              'size-[22px] rounded-full bg-danger',
              'cursor-pointer hover:bg-danger/80 transition-colors'
            )}
            onClick={onDelete}
          >
            <IoClose className="text-white text-sm" />
          </button>
        )}

        {/* Tag */}
        <div
          className={cn(
            'bg-word-game-850 border border-white',
            'rounded-2xl shadow-md',
            'px-4 lg:px-12 py-2 lg:min-w-[90px] text-center'
          )}
        >
          <span className="text-white font-medium text-base overflow-hidden text-ellipsis whitespace-nowrap block">
            {name}
          </span>
        </div>
      </div>
    </animated.div>
  );
};

export default WordClass;
