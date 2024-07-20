import { useState } from 'react';
import { IoIosAddCircle } from 'react-icons/io';

import Input from '@/components/ui/input';

interface WordClassAddProps {
  onClassAdd: (className: string) => void;
}

const WordClassAdd: React.FC<WordClassAddProps> = ({ onClassAdd }) => {
  const [className, setClassName] = useState('');

  return (
    <Input
      placeholder="أضف فئة.."
      parentClassName="w-fit"
      className="w-fit placeholder:text-white/80 border-none text-white bg-black/5 shadow-inner"
      icon={<IoIosAddCircle className="text-2xl" />}
      value={className}
      onChange={(e) => setClassName(e.target.value)}
      onIconClick={() => onClassAdd(className)}
      onKeyUp={(e) => e.key === 'Enter' && onClassAdd(className)}
    />
  );
};

export default WordClassAdd;
