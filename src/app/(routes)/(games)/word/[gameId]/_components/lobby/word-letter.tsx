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
    <label className="relative w-12 h-12">
      <input type="checkbox" className="peer opacity-0 w-0 h-0" {...props} />
      <span
        className={cn(
          'absolute top-0 left-0 right-0 bottom-0 flex flex-col items-center justify-center bg-white w-12 h-12 rounded-full text-black cursor-pointer peer-checked:bg-word-secondary transition-colors peer-checked:text-white text-lg peer-checked:peer-disabled:!bg-word-secondary/70 peer-disabled:cursor-default',
          className
        )}
      >
        {letter}
      </span>
    </label>
  );
};

export default WordLetter;
