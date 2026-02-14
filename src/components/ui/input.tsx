import { cn } from '@/lib/utils';

interface InputProps extends React.ComponentProps<'input'> {
  parentClassName?: string;
  icon?: React.ReactNode;
  onIconClick?: () => any;
}

const Input: React.FC<InputProps> = ({
  className,
  parentClassName,
  icon,
  onIconClick,
  disabled,
  ...props
}) => {
  return (
    <div className={cn('relative', parentClassName)}>
      <input
        className={cn(
          `
            w-full rounded-lg border-2 bg-transparent p-[8px] text-sm/7
            transition-colors outline-none
          `,
          icon && 'rtl:pe-10',
          className
        )}
        disabled={disabled}
        {...props}
      />
      <div
        className={cn(
          'absolute inset-y-0 end-0 z-10 flex items-center pe-3',
          onIconClick && !disabled && 'cursor-pointer',
          disabled && 'cursor-not-allowed'
        )}
        onClick={onIconClick}
      >
        {icon}
      </div>
    </div>
  );
};

export default Input;
