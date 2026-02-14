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
      <input type="checkbox" className="peer size-0 opacity-0" {...props} />
      <span
        className={cn(
          'absolute inset-0 flex items-center justify-center',
          'size-11 rounded-full bg-white text-base text-black',
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
        <div className="
          absolute top-0 -right-1 z-10 rounded-full bg-word-game-700 p-0.5
        ">
          <IoMdCheckmark className="text-xs text-white" />
        </div>
      )}
    </label>
  );
};

export default WordLetter;
