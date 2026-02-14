import { useEffect } from 'react';

const LG_BREAKPOINT = 1028;

const useMobileOverflow = (isOpen: boolean) => {
  useEffect(() => {
    const updateOverflow = () => {
      const isDesktop = window.innerWidth >= LG_BREAKPOINT;
      if (isOpen && !isDesktop) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    };

    updateOverflow();

    window.addEventListener('resize', updateOverflow);
    return () => {
      window.removeEventListener('resize', updateOverflow);
      document.body.style.overflow = '';
    };
  }, [isOpen]);
};

export default useMobileOverflow;
