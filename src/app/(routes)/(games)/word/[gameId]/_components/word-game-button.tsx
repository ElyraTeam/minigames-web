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
        'w-fit self-center bg-word-game-700 rounded-2xl disabled:bg-word-game-950',
        className
      )}
      frontClassName={cn(
        frontClassName,
        'from-word-game-600 to-word-game-700 to-[200%] text-base rounded-2xl -translate-y-[8px] group-active:-translate-y-[3px] group-disabled:-translate-y-[5px] h-[50px] py-2 group-disabled:from-word-game-800 group-disabled:to-word-game-900 group-disabled:to-[800%] px-4 w-[150px] content-center'
      )}
      {...props}
    />
  );
};

export default WordGameButton;
