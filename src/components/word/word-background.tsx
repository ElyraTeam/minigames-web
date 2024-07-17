import { cn } from '@/lib/utils';

interface WordBackgroundProps extends React.ComponentProps<'div'> {
  children?: React.ReactNode;
}

const WordBackground: React.FC<WordBackgroundProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <main className={cn('word-background', className)} {...props}>
      {children}
    </main>
  );
};

export default WordBackground;
