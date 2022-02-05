import { useEffect, useState } from 'react';

interface UseCountdownProps {
  startFrom: number;
  onCountdownUpdate?: (s: number) => void;
  onCountdownFinish?: () => void;
}

const useCountdown = ({
  startFrom,
  onCountdownUpdate,
  onCountdownFinish,
}: UseCountdownProps) => {
  const [countdown, setCountdown] = useState(startFrom);

  function startLocalTimer() {
    setTimeout(() => {
      const newCountdown = countdown! - 1;
      setCountdown(newCountdown);
      onCountdownUpdate && onCountdownUpdate(newCountdown);
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
