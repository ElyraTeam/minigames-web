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
        'bg-word-game-500/40 border-4 border-word-side-400/3 rounded-2xl shadow-md',
        'text-center py-5 font-black',
        // Desktop styles
        'lg:mx-0 lg:bg-word-game-700/60 lg:border-0 lg:rounded-none lg:shadow-lg lg:py-7',
        className
      )}
    >
      {children}
    </div>
  );
};

export default WordContentHeader;
