import { cn } from '@/lib/utils';

import Spinner from './spinner';

interface Button3DProps extends React.ComponentProps<'button'> {
  frontClassName?: string;
  loading?: boolean;
  loadingText?: string;
}

const Button3D: React.FC<Button3DProps> = ({
  className,
  frontClassName,
  loading,
  loadingText,
  children,
  disabled,
  ...props
}) => {
  const diasbled = disabled || loading;

  return (
    <button
      className={cn(
        'rounded-xl border-none padding-0 cursor-pointer group font-semibold w-full relative overflow-x-clip disabled:cursor-default',
        className
      )}
      disabled={diasbled}
      {...props}
    >
      <span
        className={cn(
          'block py-3 px-12 rounded-lg text-xl -translate-y-[12px] group-active:-translate-y-[5px] bg-gradient-to-r transition-transform w-full relative overflow-hidden',
          disabled && '-translate-y-[5px]',
          frontClassName
        )}
      >
        <span className="absolute bg-gradient-to-tr from-white/50 blur-md to-transparent w-20 h-96 left-0 -top-20 rounded-lg animate-blurry-move rotate-45" />
        {loading ? (
          <span className="space-x-2 rtl:space-x-reverse">
            <Spinner />
            <span>{loadingText}</span>
          </span>
        ) : (
          children
        )}
      </span>
    </button>
  );
};

export default Button3D;
