import useGameStore from '@/state/game';
import useLocalStore from '@/state/local';

const useOwner = () => {
  const nickname = useLocalStore((state) => state.nickname);
  const gameOwner = useGameStore((state) => state.game?.owner);
  const isOwner = gameOwner && nickname && gameOwner === nickname;

  return isOwner;
};

export default useOwner;
