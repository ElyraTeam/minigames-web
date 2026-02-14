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
          `
            flex h-8 w-8 cursor-pointer flex-col items-center justify-center
            rounded-full bg-gray-400/30 transition-colors
            hover:bg-gray-400/50
          `,
          className
        )}
        {...props}
      />
    </Tooltip>
  );
};

export default IconButton;
