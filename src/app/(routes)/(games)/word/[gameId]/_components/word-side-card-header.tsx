import { cn } from '@/lib/utils';

interface WordSideCardHeaderProps {
  children?: React.ReactNode;
  className?: string;
}

const WordSideCardHeader: React.FC<WordSideCardHeaderProps> = ({
  children,
  className,
}) => {
  return (
    <div
      className={cn(
        'text-[26px] font-bold text-center p-6 bg-word-side-200 rounded-b-3xl shadow-[theme("colors.word.side.400")_0px_0px_0px_16px]',
        className
      )}
    >
      {children}
    </div>
  );
};

export default WordSideCardHeader;
