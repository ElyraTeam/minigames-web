import { cn } from '@/lib/utils';

import WordCard from './word-card';

interface WordSideCardProps extends React.ComponentProps<'div'> {}

const WordSideCard: React.FC<WordSideCardProps> = ({ className, ...props }) => {
  return (
    <WordCard
      className={cn(
        `
          overflow-hidden bg-linear-to-t from-word-side-700 to-word-side-300
          to-190%
        `,
        className
      )}
      {...props}
    />
  );
};

export default WordSideCard;
