import React from 'react';

interface WordDropdownProps {
  title: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  min?: number;
  max: number;
  className?: string;
}

const WordDropdown: React.FC<WordDropdownProps> = ({
  title,
  value,
  onChange,
  min,
  max,
  className,
}) => {
  return (
    <div className={className}>
      <select
        dir="rtl"
        className="bg-transparent mr-5 border-b-[1px] my-1 w-12 focus:outline-none"
        value={value}
        onChange={onChange}
      >
        {Array.from({ length: max }, (x, i) => i + (min || 1)).map((num) => (
          <option key={num} value={num}>
            {num}
          </option>
        ))}
      </select>
      <span className="text-lg font-[500]">{title}</span>
    </div>
  );
};

export default WordDropdown;
