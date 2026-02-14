import useOwner from '@/hooks/use-owner';
import { cn } from '@/lib/utils';

interface WordSettingCardProps extends React.ComponentProps<'div'> {
  title: string;
}

const WordSettingCard: React.FC<WordSettingCardProps> = ({
  title,
  className,
  children,
  ...props
}) => {
  const isOwner = useOwner();

  return (
    <div className={cn('relative pt-4', className)} {...props}>
      {/* Floating Header */}
      <div className="absolute top-0 right-1/2 w-40 translate-x-1/2 z-10">
        <div
          className={cn(
            'bg-word-game-700 w-full text-center border-2 border-white rounded-2xl px-4 py-1 font-bold text-lg text-white',
            !isOwner && 'opacity-80'
          )}
        >
          {title}
        </div>
      </div>

      {/* Card Body */}
      <div className="py-3 bg-word-game-550 lg:bg-gradient-to-l lg:from-[rgba(41,53,38,0.03)] lg:to-[rgba(224,207,207,0.03)] rounded-2xl shadow-md">
        {children}
      </div>
    </div>
  );
};

export default WordSettingCard;
