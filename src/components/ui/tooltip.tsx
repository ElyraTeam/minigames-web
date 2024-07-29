'use client';

import { cn } from '@/lib/utils';

import * as React from 'react';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';

const TooltipProvider = TooltipPrimitive.Provider;

const TooltipRoot = TooltipPrimitive.Root;

const TooltipTrigger = TooltipPrimitive.Trigger;

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Content
    ref={ref}
    sideOffset={sideOffset}
    className={cn(
      'z-50 overflow-hidden rounded-md border px-3 py-1.5 text-sm shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 m-1',
      className
    )}
    {...props}
  />
));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

interface TooltipProps {
  children?: React.ReactNode;
  className?: string;
  text?: React.ReactNode;
  position?: TooltipPosition;
}

const Tooltip: React.FC<TooltipProps> = ({
  children,
  className,
  text,
  position = 'bottom',
}) => {
  return (
    <TooltipProvider>
      <TooltipRoot delayDuration={500}>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        {text && (
          <TooltipContent
            side={position}
            className={cn(
              'bg-gray-700 whitespace-nowrap py-2 px-4 rounded-xl text-white text-sm font-normal border-none',
              className
            )}
          >
            {text}
          </TooltipContent>
        )}
      </TooltipRoot>
    </TooltipProvider>
  );
};

export default Tooltip;

export { TooltipRoot, TooltipTrigger, TooltipContent, TooltipProvider };
