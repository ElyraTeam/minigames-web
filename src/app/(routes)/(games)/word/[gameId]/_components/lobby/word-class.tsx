import { IoClose } from 'react-icons/io5';

import { cn } from '@/lib/utils';
import useOwner from '@/hooks/use-owner';

interface WordClassProps {
  name: string;
  onDelete: () => void;
}

const WordClass: React.FC<WordClassProps> = ({ name, onDelete }) => {
  const isOwner = useOwner();

  return (
    <div className="relative bg-white/10 border-2 border-white rounded-lg w-28 text-center px-2 py-1">
      <p className="overflow-hidden overflow-ellipsis whitespace-nowrap text-lg">
        {name}
      </p>
      {isOwner && (
        <span
          className={cn(
            'flex flex-col items-center justify-center absolute rounded-full -top-2 -right-2 w-5 h-5 bg-danger cursor-pointer'
          )}
          onClick={onDelete}
        >
          <IoClose className="text-lg" />
        </span>
      )}
    </div>
  );
};

export default WordClass;
