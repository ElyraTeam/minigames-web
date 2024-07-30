import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';

const buttonVariants = cva('text-xl px-8 py-3 rounded-xl w-full', {
  variants: {
    variant: {
      default:
        'text-white bg-gradient-to-r from-word-primary-300 to-word-secondary-300 active:top-[2px] shadow-[0px_4px_0px_0px_rgba(0,0,0,.3)] active:shadow-[0px_2px_0px_0px_rgba(0,0,0,.3)] relative hover:opacity-90',
      'outline-gradient':
        'text-word-primary transition-all border-gradient hover:bg-word-primary-100/10',
      outline:
        'text-word-primary transition-all border-2 border-word-primary hover:bg-word-primary-100/10',
      text: 'text-word-primary hover:text-word-primary/70 transition-all p-0',
      solid:
        'border-2 bg-white/20 py-1 px-1 text-sm hover:bg-white/30 transition-colors',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

interface WordButtonProps
  extends React.ComponentProps<'button'>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean;
}

const WordButton: React.FC<WordButtonProps> = ({
  variant,
  className,
  ...props
}) => {
  return (
    <button className={cn(buttonVariants({ variant, className }))} {...props} />
  );
};

export default WordButton;
