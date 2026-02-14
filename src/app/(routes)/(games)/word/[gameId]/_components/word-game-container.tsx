import { cn } from '@/lib/utils';

interface WordGameContainerProps extends React.ComponentProps<'div'> {}

const WordGameContainer: React.FC<WordGameContainerProps> = ({
  className,
  ...props
}) => {
  return (
    <div className={cn('pt-8 pb-6 px-4 lg:py-4 lg:px-10', className)} {...props} />
  );
};

export default WordGameContainer;
