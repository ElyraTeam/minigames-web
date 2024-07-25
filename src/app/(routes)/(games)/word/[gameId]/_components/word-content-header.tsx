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
        'bg-word-game-700/60 shadow-lg w-full text-center py-7',
        className
      )}
    >
      {children}
    </div>
  );
};

export default WordContentHeader;
