import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';

const buttonVariants = cva('text-xl px-8 py-3 rounded-xl w-full', {
  variants: {
    variant: {
      default:
        'text-white bg-gradient-to-r from-primary-300 to-secondary-300 active:top-[2px] shadow-[0px_4px_0px_0px_rgba(0,0,0,.3)] active:shadow-[0px_2px_0px_0px_rgba(0,0,0,.3)] relative hover:opacity-90',
      'outline-gradient':
        'text-primary transition-all border-gradient hover:bg-primary-100/10',
      outline:
        'text-primary transition-all border-2 border-primary hover:bg-primary-100/10',
      text: 'text-primary hover:text-primary/70 transition-all p-0',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

interface ButtonProps
  extends React.ComponentProps<'button'>,
    VariantProps<typeof buttonVariants> {}

const Button: React.FC<ButtonProps> = ({ variant, className, ...props }) => {
  return (
    <button className={cn(buttonVariants({ variant, className }))} {...props} />
  );
};

export default Button;
