import { useEffect, useState } from 'react';

const useCountdown = (startFrom: number, onCountdownFinish?: () => void) => {
  const [countdown, setCountdown] = useState(startFrom);

  function startLocalTimer() {
    setTimeout(() => {
      const newCountdown = countdown! - 1;
      setCountdown(newCountdown);
    }, 1000);
  }

  useEffect(() => {
    if (countdown != 0) {
      startLocalTimer();
    } else {
      onCountdownFinish && onCountdownFinish();
    }
  }, [countdown]);

  return { countdown, setCountdown };
};

export default useCountdown;
