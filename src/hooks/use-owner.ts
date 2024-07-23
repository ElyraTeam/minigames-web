import useGameStore from "@/state/game";
import useLocalStore from "@/state/local";

const useOwner = () => {
  const playerId = useLocalStore((state) => state.playerId);
  const gameOwner = useGameStore((state) => state.game?.ownerId);
  const isOwner = gameOwner && playerId && gameOwner === playerId;

  return isOwner;
};

export default useOwner;
