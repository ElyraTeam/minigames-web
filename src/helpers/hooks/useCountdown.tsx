import { useEffect, useState } from 'react';
import useSound from 'use-sound';

const useCountdown = (startFrom: number, onCountdownFinish?: () => void) => {
  const [countdown, setCountdown] = useState(startFrom);
  const [play, { stop }] = useSound('/assets/sounds/coin-drop-4.mp3');

  function startLocalTimer() {
    setTimeout(() => {
      const newCountdown = countdown! - 1;
      setCountdown(newCountdown);
    }, 1000);
  }

  useEffect(() => {
    if (countdown != 0) {
      startLocalTimer();
      play();
    } else {
      onCountdownFinish && onCountdownFinish();
    }
  }, [countdown]);

  return { countdown, setCountdown };
};

export default useCountdown;
