'use client';

import { useRef } from 'react';

import { cn } from '@/lib/utils';
import { useIsVisible } from '@/hooks/use-visible';

interface AppearOnTransitionProps {
  children?: React.ReactNode;
  className?: string;
}

const AppearOnTransition: React.FC<AppearOnTransitionProps> = ({
  children,
  className,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useIsVisible(ref);

  return (
    <div
      ref={ref}
      className={cn(isVisible && 'duration-700 animate-in fade-in', className)}
    >
      {children}
    </div>
  );
};

export default AppearOnTransition;
