import { cn } from '@/lib/utils';

interface WordCardProps extends React.ComponentProps<'div'> {}

const WordCard: React.FC<WordCardProps> = ({ className, ...props }) => {
  return (
    <div
      className={cn(
        `
          h-full flex-1 rounded-none border-0
          lg:rounded-2xl lg:border-[3px]
        `,
        className
      )}
      {...props}
    />
  );
};

export default WordCard;
