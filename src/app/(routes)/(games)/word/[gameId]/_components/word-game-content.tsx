import { cn } from '@/lib/utils';

interface WordGameContentProps extends React.ComponentProps<'div'> {}

const WordGameContent: React.FC<WordGameContentProps> = ({
  className,
  ...props
}) => {
  return (
    <div
      className={cn(
        'flex flex-col w-full min-h-0 flex-1',
        'lg:shadow-[inset_0_-1px_20px_0px_rgba(0,0,0,0.25)]',
        'rounded-none lg:rounded-2xl bg-word-game-600 overflow-y-auto scrollbar-thin',
        'border-0 lg:border-8 border-word-game',
        'mb-0 lg:mb-4',
        className
      )}
      {...props}
    />
  );
};

export default WordGameContent;
