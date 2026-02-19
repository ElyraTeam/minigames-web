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
      <div className="absolute top-0 right-1/2 z-10 w-40 translate-x-1/2">
        <div
          className={cn(
            `
              w-full rounded-2xl border-2 border-white bg-word-game-700 px-4
              py-1 text-center text-lg font-bold text-white
            `,
            !isOwner && 'opacity-80',
          )}
        >
          {title}
        </div>
      </div>

      {/* Card Body */}
      <div
        className="
        rounded-2xl bg-word-game-550 py-3 shadow-md
        lg:bg-linear-to-l lg:from-[rgba(41,53,38,0.03)]
        lg:to-[rgba(224,207,207,0.03)]
      "
      >
        {children}
      </div>
    </div>
  );
};

export default WordSettingCard;
