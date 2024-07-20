import { useState } from 'react';
import { IoIosAddCircle } from 'react-icons/io';

import { cn } from '@/lib/utils';
import useOwner from '@/hooks/use-owner';
import Input from '@/components/ui/input';

interface WordClassAddProps {
  onClassAdd: (className: string) => void;
}

const WordClassAdd: React.FC<WordClassAddProps> = ({ onClassAdd }) => {
  const [className, setClassName] = useState('');
  const isOwner = useOwner();

  return (
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
      value={className}
      onChange={(e) => setClassName(e.target.value)}
      onIconClick={() => isOwner && onClassAdd(className)}
      onKeyUp={(e) => e.key === 'Enter' && onClassAdd(className)}
      disabled={!isOwner}
    />
  );
};

export default WordClassAdd;
