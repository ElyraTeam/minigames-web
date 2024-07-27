import { cn } from '@/lib/utils';

interface WordSettingHeaderProps extends React.ComponentProps<'div'> {
  title: string;
}

const WordSettingHeader: React.FC<WordSettingHeaderProps> = ({
  title,
  className,
  children,
  ...props
}) => {
  return (
    <div
      className={cn(
        'flex items-center justify-between py-3 px-5 lg:px-14 rounded-full shadow-inner bg-word-game-700/40',
        className
      )}
      {...props}
    >
      <p className="lg:text-lg font-semibold">{title}</p>
      {children}
    </div>
  );
};

export default WordSettingHeader;
