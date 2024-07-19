import { cn } from '@/lib/utils';

interface WordGameContainerProps extends React.ComponentProps<'div'> {}

const WordGameContainer: React.FC<WordGameContainerProps> = ({
  className,
  ...props
}) => {
  return <div className={cn('py-8 px-10 space-y-8', className)} {...props} />;
};

export default WordGameContainer;
