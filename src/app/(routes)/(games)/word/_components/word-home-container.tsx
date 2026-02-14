import { cn } from '@/lib/utils';

interface WordHomeContainerProps extends React.ComponentProps<'div'> {}

const WordHomeContainer: React.FC<WordHomeContainerProps> = ({
  className,
  ...props
}) => {
  return <div className={cn('px-12 py-4', className)} {...props} />;
};

export default WordHomeContainer;
