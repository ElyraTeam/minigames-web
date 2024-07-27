import { cn } from '@/lib/utils';

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
    <div className="relative group">
      {children}
      {text && (
        <div
          className={cn(
            'absolute bg-gray-700 hidden group-hover:block whitespace-nowrap py-2 px-4 rounded-xl text-white -translate-x-1/2 left-1/2 text-base font-normal z-10',
            position === 'top' && 'top-[-50px]',
            position === 'bottom' && 'mt-[20%]',
            className
          )}
        >
          {text}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
