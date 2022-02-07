import { useState, useEffect } from 'react';

const usePlatform = () => {
  const [width, setWidth] = useState<number>(
    (typeof window != 'undefined' && window.innerWidth) || 0
  );

  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }
  useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange);
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    };
  }, []);

  const isMobile = width <= 768;

  return { isMobile };
};

export default usePlatform;
