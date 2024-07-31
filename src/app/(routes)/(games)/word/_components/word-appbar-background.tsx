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

    document.addEventListener('scroll', handleScroll);

    return () => document.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className={cn(
        'fixed w-full flex items-center justify-between py-4 px-12 z-[9999] transition-colors',
        scrolled && 'bg-word-home'
      )}
    >
      {children}
    </div>
  );
};

export default WordAppbarBackground;
