import { useAudioPlayer } from 'react-use-audio-player';

import useLocalStore from '@/state/local';

const usePlaySound = (url: string) => {
  const { load } = useAudioPlayer();

  const play = () => {
    const isMuted = useLocalStore.getState().isMuted;
    if (isMuted) return false;
    load(url, { autoplay: true, format: 'wav', html5: true });
  };

  return [play];
};

export default usePlaySound;
