import { cn } from '@/lib/utils';

interface TooltipProps {
  children?: React.ReactNode;
  className?: string;
  text?: string;
}

const Tooltip: React.FC<TooltipProps> = ({ children, className, text }) => {
  return (
    <div className={cn('relative inline-block z-40')}>
      <div className="group">
        {children}
        {text && (
          <div
            className={cn(
              'absolute bg-gray-700 hidden group-hover:block whitespace-nowrap py-2 px-4 rounded-xl text-white bottom-[-50px] -left-[30px] z-90 text-base font-normal',
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
