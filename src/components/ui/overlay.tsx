import { cn } from '@/lib/utils';

interface OverlayProps extends React.ComponentProps<'div'> {}

const Overlay: React.FC<OverlayProps> = ({ className, ...props }) => {
  return (
    <div
      className={cn(
        'fixed h-full w-full top-0 left-0 cursor-pointer bg-black/40 z-30',
        className
      )}
      {...props}
    />
  );
};

export default Overlay;
