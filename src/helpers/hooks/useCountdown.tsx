import { useEffect, useState } from 'react';

interface UseCountdownProps {
  startFrom: number;
  onCountdownUpdate?: () => void;
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
    }, 1000);
  }

  useEffect(() => {
    if (countdown != 0) {
      startLocalTimer();
      onCountdownUpdate && onCountdownUpdate();
    } else {
      onCountdownFinish && onCountdownFinish();
    }
  }, [countdown]);

  return { countdown, setCountdown };
};

export default useCountdown;
