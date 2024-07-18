import { cn } from '@/lib/utils';

interface InputProps extends React.ComponentProps<'input'> {
  icon?: React.ReactNode;
  onIconClick?: () => any;
}

const Input: React.FC<InputProps> = ({
  className,
  icon,
  onIconClick,
  ...props
}) => {
  return (
    <div className="relative">
      <input
        className={cn(
          'rounded-lg bg-transparent outline-none border-2 border-word-side-200 w-full p-[12px] focus:border-word-secondary-300 transition-colors rtl:pe-10 text-sm',
          className
        )}
        {...props}
      />
      <div
        className={cn(
          'absolute inset-y-0 end-0 pe-3 flex items-center z-10',
          onIconClick && 'cursor-pointer'
        )}
        onClick={onIconClick}
      >
        {icon}
      </div>
    </div>
  );
};

export default Input;
