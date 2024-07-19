import { cn } from '@/lib/utils';

interface SelectProps extends React.ComponentProps<'select'> {}

const Select: React.FC<SelectProps> = ({ className, ...props }) => {
  return (
    <select
      className={cn(
        'rounded-xl px-3 border-l-8 border-l-transparent',
        className
      )}
      {...props}
    />
  );
};

export default Select;
