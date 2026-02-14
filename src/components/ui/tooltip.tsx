'use client';

import { cn } from '@/lib/utils';

import {
  HybridTooltip,
  HybridTooltipContent,
  HybridTooltipTrigger,
  TouchProvider,
} from './hybrid-tooltip';

interface TooltipProps {
  children?: React.ReactNode;
  className?: string;
  text?: React.ReactNode;
  position?: TooltipPosition;
  delayDuration?: number;
}

const Tooltip: React.FC<TooltipProps> = ({
  children,
  className,
  text,
  position = 'bottom',
  delayDuration,
}) => {
  return (
    <TouchProvider>
      <HybridTooltip delayDuration={delayDuration}>
        <HybridTooltipTrigger asChild>{children}</HybridTooltipTrigger>
        {text && (
          <HybridTooltipContent
            side={position}
            className={cn(
              `
                rounded-xl border-none bg-gray-700 px-4 py-2 text-sm font-normal
                whitespace-nowrap text-white
              `,
              className
            )}
          >
            {text}
          </HybridTooltipContent>
        )}
      </HybridTooltip>
    </TouchProvider>
  );
};

export default Tooltip;
