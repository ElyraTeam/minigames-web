import localPlayer from '@/api/socket';
import useOwner from '@/hooks/use-owner';
import useLocalStore from '@/state/local';
import usePlayersStore from '@/state/players';

import WordGameButton from '../word-game-button';

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
    localPlayer.startRound();
  };

  const renderPlayersReady = () => {
    if (allReady) return 'بانتظار المنشئ..';
    return (
      <div>
        <p className="mb-1 text-lg leading-none font-bold">
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
    <WordGameButton
      onClick={isOwner ? handleStart : handleReady}
      disabled={localReady && (!allReady || !isOwner || players?.length == 1)}
    >
      {renderText()}
    </WordGameButton>
  );
};

export default WordReadyButton;
