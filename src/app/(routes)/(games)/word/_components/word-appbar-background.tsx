'use client';

import { useEffect, useState } from 'react';

import { cn } from '@/lib/utils';

interface WordAppbarBackgroundProps {
  children?: React.ReactNode;
}

const WordAppbarBackground: React.FC<WordAppbarBackgroundProps> = ({
  children,
}) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const show = window.scrollY > 10;
      setScrolled(show);
    };

    handleScroll();

    document.addEventListener('scroll', handleScroll);

    return () => document.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className={cn(
        `
          fixed z-9999 flex w-full items-center justify-between px-4 py-4
          transition-colors
          lg:px-12
        `,
        scrolled && 'bg-word-home/80 backdrop-blur-md'
      )}
    >
      {children}
    </div>
  );
};

export default WordAppbarBackground;
