import { cn } from '@/lib/utils';

interface IconButtonProps extends React.ComponentProps<'span'> {}

const IconButton: React.FC<IconButtonProps> = ({ className, ...props }) => {
  return (
    <span
      className={cn(
        'bg-gray-400/30 w-10 h-10 inline-block rounded-full cursor-pointer hover:bg-gray-400/50 transition-colors content-center',
        className
      )}
      {...props}
    />
  );
};

export default IconButton;
