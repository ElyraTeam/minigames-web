import { useState } from 'react';
import toast from 'react-hot-toast';
import { FiRefreshCcw } from 'react-icons/fi';

import { cn } from '@/lib/utils';
import useOwner from '@/hooks/use-owner';
import Tooltip from '@/components/ui/tooltip';
import useRoomOptions from '@/hooks/use-room-options';
import { DEFAULT_CATEGORIES_ARABIC } from '@/config/word';

import WordClassAdd from './word-class-add';
import WordSelectClasses from './word-select-classes';

interface WordClassSettingsProps {}

const WordClassSettings: React.FC<WordClassSettingsProps> = ({}) => {
  const [className, setClassName] = useState('');
  const { currentOptions, updateRoomOptions } = useRoomOptions();
  const classes = currentOptions?.categories || [];
  const isOwner = useOwner();

  const deleteClass = (className: string) => {
    if (!classes.includes(className)) return;
    setRoomCategories(classes.filter((c) => c !== className));
  };

  const setRoomCategories = async (categories: string[]) => {
    if (!currentOptions) return toast.error('Current options not found.');
    const error = await updateRoomOptions({ ...currentOptions, categories });
    if (error) {
      toast.error(error);
    }
  };

  const resetClasses = () => {
    setRoomCategories(DEFAULT_CATEGORIES_ARABIC);
  };

  const addClass = (className: string) => {
    if (className.trim().length == 0) return;
    if (classes.includes(className))
      return toast.error('لا يمكن تكرار نفس الفئة');
    setRoomCategories([...classes, className]);
    setClassName('');
  };

  return (
    <div className="py-10 pb-6 px-4 space-y-6">
      {/* Categories Grid */}
      <WordSelectClasses classes={classes} onDelete={deleteClass} />

      {/* Bottom row: Add Input + Restore link */}
      <div className="flex flex-col items-center gap-4 lg:gap-6">
        {/* Add Category Input */}
        <div className="w-full lg:max-w-[200px]">
          <WordClassAdd
            value={className}
            setValue={(newValue) => setClassName(newValue)}
            onClassAdd={addClass}
          />
        </div>

        {/* Restore Link */}
        <Tooltip
          position="top"
          text={!isOwner ? 'فقط صاحب الغرفة يستطيع التعديل' : undefined}
          className="text-sm"
        >
          <button
            className={cn(
              'flex items-center gap-2 hover:opacity-80 transition-opacity cursor-pointer justify-center',
              !isOwner && 'opacity-70 !cursor-not-allowed'
            )}
            onClick={() => isOwner && resetClasses()}
            disabled={!isOwner}
          >
            <div className="flex items-center justify-center size-7 rounded-full bg-word-secondary">
              <FiRefreshCcw className="text-white text-sm" />
            </div>
            <span className="font-semibold text-white">استرجاع</span>
          </button>
        </Tooltip>
      </div>
    </div>
  );
};

export default WordClassSettings;
