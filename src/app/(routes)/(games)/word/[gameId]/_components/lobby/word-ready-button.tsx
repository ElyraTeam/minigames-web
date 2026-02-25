import { useTranslations } from 'next-intl';

import localPlayer from '@/api/socket';
import useOwner from '@/hooks/use-owner';
import useUIStore from '@/state/ui';
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
  const t = useTranslations('WordLobby');
  const setPlayersSidebarOpen = useUIStore(
    (state) => state.setPlayersSidebarOpen
  );

  const isWaitingForPlayers = isOwner && players?.length === 1;
  const isWaitingForReady =
    (isOwner && !isWaitingForPlayers && !allReady) ||
    (!isOwner && localReady && !allReady);
  const shouldOpenSidebarOnMobile = isWaitingForPlayers || isWaitingForReady;

  const handleReady = () => {
    localPlayer.ready();
  };

  const handleStart = () => {
    localPlayer.startRound();
  };

  const handleClick = () => {
    if (shouldOpenSidebarOnMobile) {
      setPlayersSidebarOpen(true);
      return;
    }
    if (isOwner) {
      handleStart();
    } else {
      handleReady();
    }
  };

  const renderPlayersReady = () => {
    if (allReady) return t('waitingForOwner');
    return (
      <div>
        <p className="mb-1 text-lg leading-none font-bold">
          <span className="leading-5">{`${numberOfReadyPlayers}`}</span>
          <span className="opacity-50">{`/${players?.length}`}</span>
        </p>
        <p className="text-xs leading-none">{t('playersReady')}</p>
      </div>
    );
  };

  const renderText = () => {
    if (!isOwner) {
      if (localReady) return renderPlayersReady();
      return t('ready');
    }
    if (isWaitingForPlayers) return t('waitingForPlayers');
    if (!allReady) return renderPlayersReady();
    return t('startRounds');
  };

  const isDisabled =
    !shouldOpenSidebarOnMobile &&
    localReady &&
    (!allReady || !isOwner || players?.length === 1);

  return (
    <WordGameButton
      onClick={handleClick}
      disabled={isDisabled}
      className={
        shouldOpenSidebarOnMobile
          ? 'lg:pointer-events-none lg:bg-word-game-950'
          : undefined
      }
      frontClassName={
        shouldOpenSidebarOnMobile
          ? `
              lg:-translate-y-[5px] lg:from-word-game-800 lg:to-word-game-900
              lg:to-800%
            `
          : undefined
      }
    >
      {renderText()}
    </WordGameButton>
  );
};

export default WordReadyButton;
