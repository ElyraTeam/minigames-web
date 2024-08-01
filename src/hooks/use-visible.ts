import { useEffect, useState } from 'react';

export function useIsVisible(ref: React.RefObject<any>) {
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (isIntersecting) return;
      setIntersecting(entry.isIntersecting);
    });

    observer.observe(ref?.current);
    return () => {
      observer.disconnect();
    };
  }, [isIntersecting, ref]);

  return isIntersecting;
}
