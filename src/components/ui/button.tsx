import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

import Spinner from './spinner';

const buttonVariants = cva(
  'w-full cursor-pointer rounded-xl px-8 py-3 text-xl transition-all',
  {
    variants: {
      variant: {
        default: 'bg-black text-white',
        danger: `
          bg-danger text-white
          hover:bg-danger/80
        `,
        warning: `
          bg-warning text-white
          hover:bg-warning/80
        `,
        text: `
          p-0 text-black
          hover:text-black/60
        `,
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
