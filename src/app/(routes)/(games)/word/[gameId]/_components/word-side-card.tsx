import { cn } from '@/lib/utils';

import WordCard from './word-card';

interface WordSideCardProps extends React.ComponentProps<'div'> {}

const WordSideCard: React.FC<WordSideCardProps> = ({ className, ...props }) => {
  return (
    <WordCard
      className={cn(
        'bg-gradient-to-t from-word-side-700 to-[190%] to-word-side-300 overflow-hidden',
        className
      )}
      {...props}
    />
  );
};

export default WordSideCard;
