import { cn } from '@/lib/utils';

import Tooltip from './tooltip';

interface SelectProps extends React.ComponentProps<'select'> {
  tooltip?: string;
  tooltipClassName?: string;
  tooltipPosition?: TooltipPosition;
}

const Select: React.FC<SelectProps> = ({
  className,
  tooltip,
  tooltipClassName,
  tooltipPosition,
  ...props
}) => {
  return (
    <Tooltip
      text={tooltip}
      className={tooltipClassName}
      position={tooltipPosition}
    >
      <select
        className={cn(
          'rounded-xl px-3 border-l-8 border-l-transparent disabled:cursor-not-allowed outline-none',
          className
        )}
        {...props}
      />
    </Tooltip>
  );
};

export default Select;
