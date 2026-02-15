import { cn } from '@/lib/utils';

import Spinner from './spinner';

export interface Button3DProps extends React.ComponentProps<'button'> {
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
        `
          padding-0 group relative w-full cursor-pointer overflow-x-clip
          rounded-xl border-none font-semibold transition-all
          disabled:cursor-default
        `,
        className
      )}
      disabled={diasbled}
      {...props}
    >
      <span
        className={cn(
          `
            relative block w-full -translate-y-[12px] overflow-hidden rounded-lg
            bg-linear-to-r px-12 py-3 text-xl transition-all
            group-active:-translate-y-[5px]
          `,
          disabled && '-translate-y-[5px]',
          frontClassName
        )}
      >
        {!diasbled && (
          <span className="
            absolute -top-20 left-0 h-96 w-20 rotate-45 animate-blurry-move
            rounded-lg bg-linear-to-tr from-white/50 to-transparent blur-md
          " />
        )}
        {loading ? (
          <span className="
            space-x-2
            rtl:space-x-reverse
          ">
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
