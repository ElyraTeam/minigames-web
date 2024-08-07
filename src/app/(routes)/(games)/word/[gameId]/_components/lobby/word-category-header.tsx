import { cn } from '@/lib/utils';

interface WordCategoryHeaderProps extends React.ComponentProps<'p'> {}

const WordCategoryHeader: React.FC<WordCategoryHeaderProps> = ({
  className,
  ...props
}) => {
  return (
    <div className="flex items-center justify-center">
      <p
        className={cn(
          'bg-word-game/40 rounded-xl p-4 shadow-md text-xl font-bold',
          className
        )}
        {...props}
      />
    </div>
  );
};

export default WordCategoryHeader;
