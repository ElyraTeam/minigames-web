import { IoMdCheckmark } from 'react-icons/io';

import { cn } from '@/lib/utils';

interface WordLetterProps extends React.ComponentProps<'input'> {
  letter: string;
  isDone?: boolean;
}

const WordLetter: React.FC<WordLetterProps> = ({
  letter,
  isDone,
  className,
  ...props
}) => {
  return (
    <label className="relative size-11">
      <input type="checkbox" className="peer opacity-0 size-0" {...props} />
      <span
        className={cn(
          'absolute inset-0 flex items-center justify-center',
          'bg-white size-11 rounded-full text-black text-base',
          'shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]',
          'cursor-pointer transition-colors',
          'peer-checked:bg-word-secondary peer-checked:text-white',
          'peer-checked:peer-disabled:bg-word-secondary/70',
          'peer-disabled:cursor-default',
          className
        )}
      >
        {letter}
      </span>
      {isDone && (
        <div className="absolute top-0 -right-1 bg-word-game-700 rounded-full p-0.5 z-10">
          <IoMdCheckmark className="text-white text-xs" />
        </div>
      )}
    </label>
  );
};

export default WordLetter;
