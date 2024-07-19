import { cn } from '@/lib/utils';

interface WordLetterProps extends React.ComponentProps<'input'> {
  letter: string;
}

const WordLetter: React.FC<WordLetterProps> = ({
  letter,
  className,
  ...props
}) => {
  return (
    <label>
      <input type="checkbox" className="peer opacity-0 w-0 h-0" {...props} />
      <span
        className={cn(
          'flex flex-col items-center justify-center bg-white w-12 h-12 rounded-full text-black cursor-pointer peer-checked:bg-word-secondary transition-colors peer-checked:text-white text-lg',
          className
        )}
      >
        {letter}
      </span>
    </label>
  );
};

export default WordLetter;
