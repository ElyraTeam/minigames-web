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
    <animated.div className="overflow-hidden pb-2" style={style}>
      <div className="relative pt-2 pr-2">
        {/* Delete button */}
        {isOwner && (
          <button
            className={cn(
              'absolute top-0 right-0 z-10',
              'flex items-center justify-center',
              'size-[22px] rounded-full bg-danger',
              `
                cursor-pointer transition-colors
                hover:bg-danger/80
              `
            )}
            onClick={onDelete}
          >
            <IoClose className="text-sm text-white" />
          </button>
        )}

        {/* Tag */}
        <div
          className={cn(
            'border border-white bg-word-game-850',
            'rounded-2xl shadow-md',
            `
              px-4 py-2 text-center
              lg:min-w-[90px] lg:px-12
            `
          )}
        >
          <span className="
            block overflow-hidden text-base font-medium text-ellipsis
            whitespace-nowrap text-white
          ">
            {name}
          </span>
        </div>
      </div>
    </animated.div>
  );
};

export default WordClass;
