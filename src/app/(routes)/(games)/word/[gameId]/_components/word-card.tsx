import { cn } from '@/lib/utils';

interface WordCardProps extends React.ComponentProps<'div'> {}

const WordCard: React.FC<WordCardProps> = ({ className, ...props }) => {
  return (
    <div
      className={cn(
        'rounded-none lg:rounded-2xl border-0 lg:border-[3px] h-full flex-1',
        className
      )}
      {...props}
    />
  );
};

export default WordCard;
