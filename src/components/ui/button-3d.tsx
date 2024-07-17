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
  ...props
}) => {
  return (
    <button
      className={cn(
        'rounded-xl border-none padding-0 cursor-pointer group bg-word-primary-900 font-semibold w-full relative overflow-x-clip disabled:cursor-default',
        className
      )}
      disabled={loading}
      {...props}
    >
      <span
        className={cn(
          'block py-3 px-12 rounded-lg text-xl -translate-y-[12px] group-active:-translate-y-[3px] bg-gradient-to-r from-word-primary-800 to-word-primary-600 transition-transform w-full relative overflow-hidden',
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
