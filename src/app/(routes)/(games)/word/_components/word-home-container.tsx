import { cn } from '@/lib/utils';

interface WordHomeContainerProps extends React.ComponentProps<'div'> {}

const WordHomeContainer: React.FC<WordHomeContainerProps> = ({
  className,
  ...props
}) => {
  return <div className={cn('py-4 px-12', className)} {...props} />;
};

export default WordHomeContainer;
