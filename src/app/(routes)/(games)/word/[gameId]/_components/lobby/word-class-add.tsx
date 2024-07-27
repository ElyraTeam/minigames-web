import { IoIosAddCircle } from 'react-icons/io';

import { cn } from '@/lib/utils';
import useOwner from '@/hooks/use-owner';
import Input from '@/components/ui/input';
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

  return (
    <Tooltip
      position="top"
      className="text-sm"
      text={!isOwner ? 'فقط صاحب الغرفة يستطيع التعديل' : undefined}
    >
      <Input
        placeholder="أضف فئة.."
        parentClassName="w-fit"
        className="w-fit placeholder:text-white/80 border-none text-white bg-black/5 shadow-inner disabled:cursor-not-allowed"
        icon={
          <IoIosAddCircle
            className={cn(
              'text-2xl',
              !isOwner && 'text-white/70 cursor-not-allowed'
            )}
          />
        }
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onIconClick={() => isOwner && onClassAdd(value)}
        onKeyUp={(e) => e.key === 'Enter' && onClassAdd(value)}
        disabled={!isOwner}
      />
    </Tooltip>
  );
};

export default WordClassAdd;
