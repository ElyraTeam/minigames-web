import React from 'react';

import { cn } from '@/lib/utils';

import Tooltip from './tooltip';

interface SwitchProps extends React.ComponentProps<'input'> {
  tooltip?: string;
  tooltipClassName?: string;
  tooltipPosition?: TooltipPosition;
}

const Switch: React.FC<SwitchProps> = ({
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
      <label className="relative inline-block h-6 w-12">
        <input type="checkbox" className="peer h-0 w-0 opacity-0" {...props} />
        <span
          className={cn(
            `
              absolute top-0 right-0 bottom-0 left-0 cursor-pointer rounded-full
              bg-slate-300/50 transition-all duration-300
              peer-disabled:cursor-not-allowed
              before:absolute before:top-1/2 before:right-[3px] before:h-[18px]
              before:w-[18px] before:-translate-y-1/2 before:rounded-full
              before:bg-white before:transition-all before:duration-300
              before:content-['']
              peer-checked:before:right-[27px]
            `,
            className
          )}
        />
      </label>
    </Tooltip>
  );
};

export default Switch;
