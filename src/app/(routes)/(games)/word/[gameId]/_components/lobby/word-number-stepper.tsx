import { IoChevronDown } from 'react-icons/io5';

import { cn } from '@/lib/utils';
import Tooltip from '@/components/ui/tooltip';

interface WordNumberStepperProps {
  value: number;
  options: number[];
  disabled?: boolean;
  tooltip?: string;
  onChange: (value: number) => void;
}

const WordNumberStepper: React.FC<WordNumberStepperProps> = ({
  value,
  options,
  disabled,
  tooltip,
  onChange,
}) => {
  return (
    <Tooltip
      position="top"
      className="text-sm"
      text={disabled ? tooltip : undefined}
    >
      <div className="relative">
        <select
          value={value}
          disabled={disabled}
          onChange={(e) => onChange(Number(e.target.value))}
          className={cn(
            'appearance-none bg-word-game-700 text-white text-sm font-semibold',
            'rounded-full pl-7 pr-3 h-7 min-w-[60px] leading-7',
            'cursor-pointer focus:outline-none',
            'disabled:opacity-70 disabled:cursor-not-allowed'
          )}
        >
          {options.map((option) => (
            <option
              key={`stepper-option-${option}`}
              value={option}
              className="bg-word-game-700"
            >
              {option}
            </option>
          ))}
        </select>
        <IoChevronDown className="absolute left-2 top-1/2 -translate-y-1/2 text-white text-sm pointer-events-none" />
      </div>
    </Tooltip>
  );
};

export default WordNumberStepper;
