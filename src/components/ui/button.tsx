import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';

const buttonVariants = cva('text-xl px-8 py-3 rounded-xl w-full', {
  variants: {
    variant: {
      default: 'text-white bg-black',
      danger: 'text-white bg-danger hover:bg-danger/80',
      warning: 'text-white bg-warning hover:bg-warning/80 transition-all',
      text: 'text-black hover:text-black/60 transition-all p-0',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

interface ButtonProps
  extends React.ComponentProps<'button'>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  variant,
  className,
  loading,
  ...props
}) => {
  return (
    <button className={cn(buttonVariants({ variant, className }))} {...props} />
  );
};

export default Button;
