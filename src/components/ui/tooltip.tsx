'use client';

import { cn } from '@/lib/utils';

import {
  HybridTooltip,
  HybridTooltipContent,
  HybridTooltipTrigger,
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
    <HybridTooltip delayDuration={delayDuration}>
      <HybridTooltipTrigger asChild>{children}</HybridTooltipTrigger>
      {text && (
        <HybridTooltipContent
          side={position}
          className={cn(
            'bg-gray-700 whitespace-nowrap py-2 px-4 rounded-xl text-white text-sm font-normal border-none',
            className
          )}
        >
          {text}
        </HybridTooltipContent>
      )}
    </HybridTooltip>
  );
};

export default Tooltip;
