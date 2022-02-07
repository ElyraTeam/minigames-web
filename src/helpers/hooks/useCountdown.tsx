import { useEffect, useState } from "react";

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
  const [started, setStarted] = useState(false);

  function startLocalTimer() {
    setTimeout(() => {
      const newCountdown = countdown! - 1;
      setCountdown(newCountdown);
      if (newCountdown == 0) {
        onCountdownFinish && onCountdownFinish();
        setStarted(false);
      }
    }, 1000);
  }

  useEffect(() => {
    if (countdown != 0) {
      onCountdownUpdate && onCountdownUpdate(countdown);
      startLocalTimer();
    }
  }, [countdown]);

  return { countdown, setCountdown };
};

export default useCountdown;
