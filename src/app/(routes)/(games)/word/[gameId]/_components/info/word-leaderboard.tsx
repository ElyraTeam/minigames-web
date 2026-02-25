import { useEffect, useState } from 'react';
import { useTransition } from '@react-spring/web';
import { useTranslations } from 'next-intl';

import { State } from '@/types/word';
import useGameStore from '@/state/game';
import useRoomStore from '@/state/room';
import { kickPlayer } from '@/api/rooms';
import useLocalStore from '@/state/local';
import usePlayersStore from '@/state/players';
import ConfirmModal from '@/components/modals/confirm-modal';

import WordPlayerRank from './word-player-rank';

interface WordLeaderboardProps {
  lastRound?: boolean;
}

const PLAYER_RANK_HEIGHT = 68;

const WordLeaderboard: React.FC<WordLeaderboardProps> = ({ lastRound }) => {
  const gamePlayers = usePlayersStore((state) => state.players);
  const roomOptions = useRoomStore((state) => state.options);
  const gameStatus = useGameStore((state) => state.game?.state);
  const currentPlayer = useLocalStore((state) => state.nickname);
  const [sortedPlayers, setSortedPlayers] = useState<Player[]>([]);
  const remaining =
    (roomOptions?.options?.maxPlayers || 0) - sortedPlayers.length;
  const [kickingPlayer, setKickingPlayer] = useState<Player | null>(null);
  const [kickModalOpen, setKickModalOpen] = useState(false);
  const t = useTranslations('WordGame');

  let totalHeight = 0;
  const transitions = useTransition(
    sortedPlayers.map((data) => ({
      ...data,
      height: PLAYER_RANK_HEIGHT,
      y: (totalHeight += PLAYER_RANK_HEIGHT) - PLAYER_RANK_HEIGHT,
    })),
    {
      key: (item: Player) => item.id,
      from: { height: 0, opacity: 0 },
      leave: { height: 0, opacity: 0 },
      enter: ({ height, y }) => ({ y, height, opacity: 1 }),
      update: ({ height, y }) => ({ y, height }),
    }
  );

  const handleKick = async () => {
    if (!roomOptions?.id || !kickingPlayer || kickingPlayer.owner) return;
    kickPlayer(roomOptions.id, kickingPlayer.id);
    setKickModalOpen(false);
    setTimeout(() => {
      setKickingPlayer(null);
    }, 200);
  };

  useEffect(() => {
    if (!gamePlayers || !gamePlayers.players) return;
    setSortedPlayers(
      [...gamePlayers.players].sort((a, b) =>
        lastRound
          ? b.lastRoundScore - a.lastRoundScore
          : b.totalScore - a.totalScore
      )
    );
  }, [gamePlayers, lastRound]);

  return (
    <>
      <ConfirmModal
        subtitle={t.rich('kickConfirm', {
          nickname: kickingPlayer?.nickname ?? '',
          b: (chunks) => <span className="font-bold">{chunks}</span>,
        })}
        isOpen={kickModalOpen}
        onOpenChange={(open) => {
          setKickModalOpen(open);
          if (!open) {
            setTimeout(() => {
              setKickingPlayer(null);
            }, 200);
          }
        }}
        onConfirm={handleKick}
      />
      <div
        className="relative scrollbar-none flex grow flex-col overflow-y-auto"
        style={{
          height: PLAYER_RANK_HEIGHT * (roomOptions?.options?.maxPlayers || 0),
        }}
      >
        {transitions((style, plr, _, index) => (
          <WordPlayerRank
            key={plr.id}
            rank={index + 1}
            name={plr.nickname}
            score={lastRound ? plr.lastRoundScore : plr.totalScore}
            isOwner={plr.owner}
            isLocalPlayer={plr.nickname === currentPlayer}
            isOnline={plr.online}
            checkmark={
              gameStatus === State.LOBBY ? !plr.owner && plr.ready : plr.voted
            }
            onKick={() => {
              setKickModalOpen(true);
              setKickingPlayer(plr);
            }}
            checkmarkText={gameStatus === State.LOBBY ? t('playerReady') : t('playerVoted')}
            style={{
              zIndex: sortedPlayers.length - index,
              ...style,
            }}
          />
        ))}
        {remaining > 0 &&
          Array.from(new Array(remaining), (_, index) => (
            <WordPlayerRank
              key={`word-leaderboard-remaining-${index}`}
              score={0}
              rank={sortedPlayers.length + (index + 1)}
              isPlayer={false}
              style={{
                top: (totalHeight += PLAYER_RANK_HEIGHT) - PLAYER_RANK_HEIGHT,
              }}
            />
          ))}
      </div>
    </>
  );
};

export default WordLeaderboard;
