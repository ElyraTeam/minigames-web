import { cn } from '@/lib/utils';

interface WordHeaderIconProps extends React.ComponentProps<'button'> {
  variant?: 'default' | 'danger';
  theme?: 'light' | 'dark';
}

const WordHeaderIcon: React.FC<WordHeaderIconProps> = ({
  children,
  className,
  variant = 'default',
  theme = 'dark',
  ...props
}) => {
  const themeStyles = {
    dark: {
      default: 'bg-word-side-100 text-word-side-400 hover:bg-word-side-100/80',
      danger: 'bg-word-side-100 text-danger hover:bg-danger hover:text-white',
    },
    light: {
      default: 'bg-white/40 text-word-secondary hover:bg-word-secondary hover:text-white',
      danger: 'bg-white/40 text-danger hover:bg-danger hover:text-white',
    },
  };

  return (
    <button
      className={cn(
        'flex size-10 items-center justify-center rounded-full',
        'cursor-pointer transition-colors',
        themeStyles[theme][variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default WordHeaderIcon;
