import { cn } from '@/lib/utils';

import Tooltip from './tooltip';

interface IconButtonProps extends React.ComponentProps<'span'> {
  tooltip?: string;
}

const IconButton: React.FC<IconButtonProps> = ({
  className,
  tooltip,
  ...props
}) => {
  return (
    <Tooltip text={tooltip}>
      <span
        className={cn(
          'bg-gray-400/30 w-8 h-8 rounded-full cursor-pointer hover:bg-gray-400/50 transition-colors flex flex-col items-center justify-center',
          className
        )}
        {...props}
      />
    </Tooltip>
  );
};

export default IconButton;
