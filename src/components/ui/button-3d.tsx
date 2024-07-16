import { cn } from '@/lib/utils';

interface Button3DProps extends React.ComponentProps<'button'> {
  frontClassName?: string;
}

const Button3D: React.FC<Button3DProps> = ({
  className,
  frontClassName,
  children,
  ...props
}) => {
  return (
    <button
      className={cn(
        'rounded-xl border-none padding-0 cursor-pointer group bg-primary-900 font-semibold w-full relative overflow-x-clip',
        className
      )}
      {...props}
    >
      <span
        className={cn(
          'block py-3 px-12 rounded-lg text-xl -translate-y-[12px] group-active:-translate-y-[3px] bg-gradient-to-r from-primary-700 to-primary-800 transition-transform w-full relative overflow-hidden',
          frontClassName
        )}
      >
        <span className="absolute bg-gradient-to-tr from-white/50 blur-md to-transparent w-20 h-96 left-0 -top-20 rounded-lg animate-blurry-move rotate-45" />
        {children}
      </span>
    </button>
  );
};

export default Button3D;
