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
            'appearance-none bg-word-game-700 text-sm font-semibold text-white',
            'h-7 min-w-[60px] rounded-full pr-3 pl-7 leading-7',
            `
              cursor-pointer
              focus:outline-none
            `,
            'disabled:cursor-not-allowed disabled:opacity-70'
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
        <IoChevronDown className="
          pointer-events-none absolute top-1/2 left-2 -translate-y-1/2 text-sm
          text-white
        " />
      </div>
    </Tooltip>
  );
};

export default WordNumberStepper;
