import localPlayer from '@/api/socket';
import useOwner from '@/hooks/use-owner';
import useLocalStore from '@/state/local';
import usePlayersStore from '@/state/players';
import Button3D from '@/components/ui/button-3d';

interface WordReadyButtonProps {}

const WordReadyButton: React.FC<WordReadyButtonProps> = ({}) => {
  const nickname = useLocalStore((state) => state.nickname);
  const players = usePlayersStore((state) => state.players?.players);
  const numberOfReadyPlayers = players?.filter((player) => player.ready).length;
  const allReady = numberOfReadyPlayers === players?.length;
  const localReady = players?.some((p) => p.ready && p.nickname === nickname);
  const isOwner = useOwner();

  const handleReady = () => {
    localPlayer.ready();
  };

  const handleStart = () => {
    // TODO: add start login when design is done
  };

  const renderPlayersReady = () => {
    if (allReady) return 'بانتظار المنشئ..';
    return (
      <div>
        <p className="leading-none font-bold text-lg mb-1">
          <span className="leading-5">{`${numberOfReadyPlayers}`}</span>
          <span className="opacity-50">{`/${players?.length}`}</span>
        </p>
        <p className="text-xs leading-none">مستعدون</p>
      </div>
    );
  };

  const renderText = () => {
    if (!isOwner) {
      if (localReady) return renderPlayersReady();
      return 'مستعد';
    }
    if (players?.length == 1) return 'بانتظار اللاعبين..';
    if (!allReady) return renderPlayersReady();
    return 'ابدأ الجولات!';
  };

  return (
    <Button3D
      className="w-fit self-center bg-word-game-700 rounded-2xl disabled:bg-word-game-950"
      frontClassName="from-word-game-600 to-word-game-700 to-[200%] text-base rounded-2xl -translate-y-[8px] group-active:-translate-y-[3px] group-disabled:-translate-y-[5px] h-[50px] py-2 group-disabled:from-word-game-800 group-disabled:to-word-game-900 group-disabled:to-[800%] px-4 w-[150px] content-center"
      onClick={isOwner ? handleStart : handleReady}
      disabled={localReady && (!allReady || !isOwner || players?.length == 1)}
    >
      {renderText()}
    </Button3D>
  );
};

export default WordReadyButton;
