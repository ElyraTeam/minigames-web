import { IoAdd } from 'react-icons/io5';

import { cn } from '@/lib/utils';
import useOwner from '@/hooks/use-owner';
import Tooltip from '@/components/ui/tooltip';

interface WordClassAddProps {
  value: string;
  setValue: (value: string) => void;
  onClassAdd: (className: string) => void;
}

const WordClassAdd: React.FC<WordClassAddProps> = ({
  value,
  setValue,
  onClassAdd,
}) => {
  const isOwner = useOwner();

  const handleSubmit = () => {
    if (isOwner && value.trim()) {
      onClassAdd(value);
    }
  };

  return (
    <Tooltip
      position="top"
      className="text-sm"
      text={!isOwner ? 'فقط صاحب الغرفة يستطيع التعديل' : undefined}
    >
      <div
        className={cn(
          'flex items-center',
          `
            rounded-full border border-black/40 bg-white
            focus-within:border-word-side
          `,
          'overflow-hidden',
        )}
      >
        {/* Input */}
        <input
          type="text"
          placeholder="أضف فئة.."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyUp={(e) => e.key === 'Enter' && handleSubmit()}
          disabled={!isOwner}
          className={cn(
            'flex-1 bg-transparent py-2 pr-4 pl-1 text-word-side-400',
            `
              text-right
              placeholder:text-word-side-200/60
            `,
            'focus:outline-none',
            'disabled:cursor-not-allowed',
          )}
        />

        {/* Add Button */}
        <button
          onClick={handleSubmit}
          disabled={!isOwner}
          className={cn(
            'flex items-center justify-center',
            'px-3 py-2',
            'bg-transparent text-word-side-200',
            `
              transition-colors
              hover:bg-word-side-200/10
            `,
            'disabled:cursor-not-allowed disabled:opacity-50',
          )}
        >
          <IoAdd className="text-2xl" />
        </button>
      </div>
    </Tooltip>
  );
};

export default WordClassAdd;
