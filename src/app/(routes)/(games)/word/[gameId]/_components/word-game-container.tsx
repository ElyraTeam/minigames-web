import { cn } from '@/lib/utils';

interface WordGameContainerProps extends React.ComponentProps<'div'> {}

const WordGameContainer: React.FC<WordGameContainerProps> = ({
  className,
  ...props
}) => {
  return (
    <div className={cn('py-2 px-2 lg:px-10 space-y-8', className)} {...props} />
  );
};

export default WordGameContainer;
