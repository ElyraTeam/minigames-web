import { cn } from '@/lib/utils';
import Button3D, { Button3DProps } from '@/components/ui/button-3d';

interface WordGameButtonProps extends Button3DProps {}

const WordGameButton: React.FC<WordGameButtonProps> = ({
  className,
  frontClassName,
  ...props
}) => {
  return (
    <Button3D
      className={cn(
        `
          w-fit self-center rounded-2xl bg-word-game-700
          disabled:bg-word-game-950
        `,
        className,
      )}
      frontClassName={cn(
        frontClassName,
        `
          h-[50px] w-[200px] -translate-y-[8px] content-center rounded-2xl
          from-word-game-600 to-word-game-700 to-200% px-4 py-2 text-base
          group-active:-translate-y-[3px]
          group-disabled:-translate-y-[5px] group-disabled:from-word-game-800
          group-disabled:to-word-game-900 group-disabled:to-800%
        `,
      )}
      {...props}
    />
  );
};

export default WordGameButton;
