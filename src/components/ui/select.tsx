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
          `
            scrollbar-thin rounded-xl border-l-8 border-l-transparent px-3
            outline-none
            disabled:cursor-not-allowed
          `,
          className
        )}
        {...props}
      />
    </Tooltip>
  );
};

export default Select;
