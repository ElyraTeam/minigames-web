import { cn } from '@/lib/utils';

interface TooltipProps {
  children?: React.ReactNode;
  className?: string;
  text?: string;
  position?: TooltipPosition;
}

const Tooltip: React.FC<TooltipProps> = ({
  children,
  className,
  text,
  position = 'bottom',
}) => {
  return (
    <div className={'relative inline-block'}>
      <div className="group">
        {children}
        {text && (
          <div
            className={cn(
              'absolute bg-gray-700 hidden group-hover:block whitespace-nowrap py-2 px-4 rounded-xl text-white -left-[30px] text-base font-normal',
              position === 'top' && 'top-[-50px]',
              position == 'bottom' && 'bottom-[-50px]',
              className
            )}
          >
            {text}
          </div>
        )}
      </div>
    </div>
  );
};

export default Tooltip;
