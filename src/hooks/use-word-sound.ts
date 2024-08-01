import { WORD_SOUNDS_URL, WordSound } from '@/config/word';

import usePlaySound from './use-play-sound';

const useWordSound = (sound: WordSound) => {
  const soundData = usePlaySound(`${WORD_SOUNDS_URL}/${sound}`);

  return soundData;
};

export default useWordSound;
