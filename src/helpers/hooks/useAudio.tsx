import { useState, useEffect, useContext } from "react";
import { AudioContext } from "../../audio/audio";

const useAudio = (key: string) => {
  const audioCtx = useContext(AudioContext);
  const [playing, setPlaying] = useState(false);

  const toggle = () => {
    setPlaying((wasPlaying) => {
      !wasPlaying
        ? audioCtx?.play(key, () => {
            setPlaying(false);
          })
        : audioCtx?.pause();
      return !wasPlaying;
    });
  };
  return { playing, toggle };
};

export default useAudio;
