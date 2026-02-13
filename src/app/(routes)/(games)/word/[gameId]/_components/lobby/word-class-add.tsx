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
          'bg-white border border-black/40 focus-within:border-word-side rounded-full',
          'overflow-hidden'
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
            'flex-1 bg-transparent text-word-side-400 py-2 pl-1 pr-4',
            'text-right placeholder:text-word-side-200/60',
            'focus:outline-none',
            'disabled:cursor-not-allowed'
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
            'hover:bg-word-side-200/10 transition-colors',
            'disabled:opacity-50 disabled:cursor-not-allowed'
          )}
        >
          <IoAdd className="text-2xl" />
        </button>
      </div>
    </Tooltip>
  );
};

export default WordClassAdd;
