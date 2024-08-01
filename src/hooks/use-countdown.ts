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

  useEffect(() => {
    const startLocalTimer = () => {
      setTimeout(() => {
        const newCountdown = countdown! - 1;
        setCountdown(newCountdown);
        if (newCountdown == 0) {
          onCountdownFinish && onCountdownFinish();
        }
      }, 1000);
    };

    if (countdown != 0) {
      onCountdownUpdate && onCountdownUpdate(countdown);
      startLocalTimer();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countdown]);

  return { countdown, setCountdown };
};

export default useCountdown;
