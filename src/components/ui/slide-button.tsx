'use client';

import { useRef, useState } from 'react';

import { cn } from '@/lib/utils';
import WordButton from '@/components/word/word-button';

interface SlideButtonProps {
  label: string;
  placeholderLabel?: string;
  animation?: boolean;
  center?: boolean;
  className?: string;
  maxLength?: number;
  initialValue?: string;
  onInputTextChange?: (text: string) => void;
  onKeyPress?: (key: string) => void;
  children?: React.ReactNode;
}

const SlideButton: React.FC<SlideButtonProps> = ({
  label,
  center,
  placeholderLabel,
  animation = true,
  className,
  maxLength = 10,
  children,
  initialValue,
  onInputTextChange,
  onKeyPress,
}) => {
  const [isOpen, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleOpen = () => {
    setOpen(true);
    inputRef.current?.focus();
  };

  return (
    <div
      className={cn(
        'h-14 w-72 relative group overflow-hidden rounded-2xl',
        className,
        center && 'self-center'
      )}
    >
      <div className={cn('absolute h-full w-full top-0')}>
        <input
          ref={inputRef}
          className="focus:outline-none border-2 border-transparent focus:border-light rounded-2xl px-4 w-full h-full shadow-[inset_0_0_6px_rgba(0,0,0,0.20)]"
          type="text"
          defaultValue={initialValue}
          placeholder={placeholderLabel}
          onBlur={() => setOpen(false)}
          onChange={(e) =>
            onInputTextChange && onInputTextChange(e.target.value)
          }
          onKeyUp={(e) => onKeyPress && onKeyPress(e.key)}
          maxLength={maxLength}
        />
        {children && (
          <div
            className={cn(
              'absolute left-5 top-1/4 h-full cursor-pointer',
              animation &&
                'translate-x-16 group-hover:translate-x-0 transition-transform duration-500 delay-500 group-hover:delay-0',
              animation && isOpen && 'translate-x-0 !delay-0'
            )}
          >
            {children}
          </div>
        )}
      </div>
      <WordButton
        onClick={handleOpen}
        className={cn(
          'text-xl translate-x-0 w-full h-full cursor-text transition-all duration-500 group-hover:translate-x-full group-hover:text-lg',
          isOpen && 'translate-x-full'
        )}
      >
        {label}
      </WordButton>
    </div>
  );
};

export default SlideButton;
