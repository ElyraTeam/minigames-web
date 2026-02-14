import { cn } from '@/lib/utils';

interface WordGameContentProps extends React.ComponentProps<'div'> {}

const WordGameContent: React.FC<WordGameContentProps> = ({
  className,
  ...props
}) => {
  return (
    <div
      className={cn(
        'flex min-h-0 w-full flex-1 flex-col',
        'lg:shadow-[inset_0_-1px_20px_0px_rgba(0,0,0,0.25)]',
        `
          scrollbar-thin overflow-y-auto rounded-none bg-word-game-600
          lg:rounded-2xl
        `,
        `
          border-0 border-word-game
          lg:border-8
        `,
        `
          mb-0
          lg:mb-4
        `,
        className
      )}
      {...props}
    />
  );
};

export default WordGameContent;
