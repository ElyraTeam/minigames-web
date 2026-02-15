import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';

const buttonVariants = cva('w-full cursor-pointer rounded-xl px-8 py-3 text-xl', {
  variants: {
    variant: {
      default:
        `
          relative bg-linear-to-r from-word-primary-300 to-word-secondary-300
          text-white shadow-[0px_4px_0px_0px_rgba(0,0,0,.3)]
          hover:opacity-90
          active:top-[2px] active:shadow-[0px_2px_0px_0px_rgba(0,0,0,.3)]
        `,
      'outline-gradient':
        `
          border-gradient text-word-primary transition-all
          hover:bg-word-primary-100/10
        `,
      outline:
        `
          hover:bg-word-game-100/10
          border-2 border-word-game text-word-game transition-all
        `,
      text: `
        p-0 text-word-primary transition-all
        hover:text-word-primary/70
      `,
      solid:
        `
          border-2 bg-white/20 px-1 py-1 text-sm transition-colors
          hover:bg-white/30
          disabled:cursor-default disabled:opacity-40
          disabled:hover:bg-white/20
        `,
      regular:
        `
          bg-word-game-600 text-white transition-all
          hover:bg-word-game-600/80
        `,
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
