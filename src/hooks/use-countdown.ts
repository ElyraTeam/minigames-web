import { useEffect } from 'react';

import useGameStore from '@/state/game';

interface UseCountdownProps {
  onCountdownUpdate?: (s: number) => void;
  onCountdownFinish?: () => void;
}

const useCountdown = ({
  onCountdownUpdate,
  onCountdownFinish,
}: UseCountdownProps) => {
  const countdown = useGameStore((state) => state.countdown);
  const setCountdown = useGameStore((state) => state.setCountdown);

  useEffect(() => {
    const startLocalTimer = () => {
      setTimeout(() => {
        const newCountdown = countdown - 1;
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
