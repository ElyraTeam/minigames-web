import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

import Spinner from './spinner';

const buttonVariants = cva(
  'text-xl px-8 py-3 rounded-xl w-full cursor-pointer transition-all',
  {
    variants: {
      variant: {
        default: 'text-white bg-black',
        danger: 'text-white bg-danger hover:bg-danger/80',
        warning: 'text-white bg-warning hover:bg-warning/80',
        text: 'text-black hover:text-black/60 p-0',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

interface ButtonProps
  extends React.ComponentProps<'button'>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  variant,
  className,
  loading,
  disabled,
  children,
  ...props
}) => {
  return (
    <button
      className={cn(buttonVariants({ variant, className }))}
      disabled={loading || disabled}
      {...props}
    >
      {loading ? <Spinner /> : children}
    </button>
  );
};

export default Button;
