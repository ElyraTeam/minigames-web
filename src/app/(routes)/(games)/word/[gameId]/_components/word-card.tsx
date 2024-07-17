import { cn } from '@/lib/utils';

interface WordCardProps extends React.ComponentProps<'div'> {}

const WordCard: React.FC<WordCardProps> = ({ className, ...props }) => {
  return (
    <div className={cn('rounded-2xl border-[3px]', className)} {...props} />
  );
};

export default WordCard;
