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
        `
          rounded-b-3xl bg-word-side-200 p-6 text-center text-[26px] font-bold
          shadow-[var(--color-word-side-400)_0px_0px_0px_16px]
        `,
        className
      )}
    >
      {children}
    </div>
  );
};

export default WordSideCardHeader;
