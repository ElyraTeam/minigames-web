import useLocalStore from '@/state/local';
import usePlayersStore from '@/state/players';

const useCurrentPlayer = () => {
  const players = usePlayersStore((state) => state.players?.players);
  const currentPlayerId = useLocalStore((state) => state.playerId);

  return players?.find((plr) => plr.id === currentPlayerId);
};

export default useCurrentPlayer;
