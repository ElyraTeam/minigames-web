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
        'group relative h-14 w-72 overflow-hidden rounded-2xl',
        className,
        center && 'self-center'
      )}
    >
      <div className={cn('absolute top-0 h-full w-full')}>
        <input
          ref={inputRef}
          className="
            focus:border-light
            h-full w-full rounded-2xl border-2 border-transparent px-4
            shadow-[inset_0_0_6px_rgba(0,0,0,0.20)]
            focus:outline-none
          "
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
              'absolute top-1/4 left-5 h-full cursor-pointer',
              animation &&
                `
                  translate-x-16 transition-transform delay-500 duration-500
                  group-hover:translate-x-0 group-hover:delay-0
                `,
              animation && isOpen && 'translate-x-0 delay-0!'
            )}
          >
            {children}
          </div>
        )}
      </div>
      <WordButton
        onClick={handleOpen}
        className={cn(
          `
            h-full w-full translate-x-0 cursor-text text-xl transition-all
            duration-500
            group-hover:translate-x-full group-hover:text-lg
          `,
          isOpen && 'translate-x-full'
        )}
      >
        {label}
      </WordButton>
    </div>
  );
};

export default SlideButton;
