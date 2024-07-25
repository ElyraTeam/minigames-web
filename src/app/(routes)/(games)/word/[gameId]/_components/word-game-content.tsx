import { cn } from '@/lib/utils';

interface WordGameContentProps extends React.ComponentProps<'div'> {}

const WordGameContent: React.FC<WordGameContentProps> = ({
  className,
  ...props
}) => {
  return (
    <div
      className={cn(
        'flex flex-col w-full h-full max-h-96 shadow-[inset_0_0_10px_rgba(0,0,0,0.2)] rounded-2xl bg-word-game-600 mb-4 overflow-y-auto scrollbar-thin border-8 border-word-game',
        className
      )}
      {...props}
    />
  );
};

export default WordGameContent;
