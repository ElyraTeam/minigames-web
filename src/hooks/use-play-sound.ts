import useSound from 'use-sound';

import useLocalStore from '@/state/local';

const usePlaySound = (url: string) => {
  const [playSound] = useSound(url);
  const isMuted = useLocalStore((state) => state.isMuted);

  const play = () => {
    if (!isMuted) return false;
    playSound();
  };

  return { play };
};

export default usePlaySound;
