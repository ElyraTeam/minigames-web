import Button3D from '@/components/ui/button-3d';

interface WordReadyButtonProps {}

const WordReadyButton: React.FC<WordReadyButtonProps> = ({}) => {
  return (
    <Button3D
      className="w-fit self-center bg-word-game-700"
      frontClassName="from-word-game-600 to-word-game-700 to-[200%]"
    >
      مستعد
    </Button3D>
  );
};

export default WordReadyButton;
