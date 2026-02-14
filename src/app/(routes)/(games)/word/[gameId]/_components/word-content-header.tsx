import { cn } from '@/lib/utils';

interface WordContentHeaderProps {
  className?: string;
  children?: React.ReactNode;
}

const WordContentHeader: React.FC<WordContentHeaderProps> = ({
  className,
  children,
}) => {
  return (
    <div
      className={cn(
        // Mobile styles
        `
          rounded-2xl border-4 border-word-side-400/3 bg-word-game-500/40
          shadow-md
        `,
        'py-5 text-center font-black',
        // Desktop styles
        `
          lg:mx-0 lg:rounded-none lg:border-0 lg:bg-word-game-700/60 lg:py-7
          lg:shadow-lg
        `,
        className
      )}
    >
      {children}
    </div>
  );
};

export default WordContentHeader;
