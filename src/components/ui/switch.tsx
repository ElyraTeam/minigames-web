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
      <label className="relative inline-block w-12 h-6">
        <input type="checkbox" className="peer opacity-0 w-0 h-0" {...props} />
        <span
          className={cn(
            "absolute bg-slate-300/50 top-0 left-0 right-0 bottom-0 cursor-pointer transition-all duration-300 rounded-full before:content-[''] before:absolute before:transition-all before:duration-300 before:rounded-full before:h-[75%] before:bg-white before:peer-checked:-translate-x-full before:aspect-square before:top-1/2 before:-translate-y-1/2 before:left-1/2 peer-disabled:cursor-not-allowed",
            className
          )}
        />
      </label>
    </Tooltip>
  );
};

export default Switch;
