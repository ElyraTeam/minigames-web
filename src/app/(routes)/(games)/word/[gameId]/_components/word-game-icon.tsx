import { cn } from '@/lib/utils';
import IconButton from '@/components/ui/icon-button';

interface WordGameIconProps {
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
  tooltip?: string;
  active?: boolean;
}

const WordGameIcon: React.FC<WordGameIconProps> = ({
  children,
  className,
  onClick,
  tooltip,
  active,
}) => {
  return (
    <IconButton
      className={cn(
        'text-word-secondary w-10 h-10 text-xl bg-white/40 hover:bg-word-secondary hover:text-white transition-all group',
        active && 'bg-word-secondary text-white',
        className
      )}
      onClick={onClick}
      tooltip={tooltip}
    >
      {children}
    </IconButton>
  );
};

export default WordGameIcon;
