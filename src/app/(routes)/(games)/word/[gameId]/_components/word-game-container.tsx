import { cn } from '@/lib/utils';

interface WordGameContainerProps extends React.ComponentProps<'div'> {}

const WordGameContainer: React.FC<WordGameContainerProps> = ({
  className,
  ...props
}) => {
  return (
    <div className={cn(`
      px-4 pt-8 pb-6
      lg:px-10 lg:py-4
    `, className)} {...props} />
  );
};

export default WordGameContainer;
