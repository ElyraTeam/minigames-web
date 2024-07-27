import { useState } from 'react';
import toast from 'react-hot-toast';
import { FiRefreshCcw } from 'react-icons/fi';

import { cn } from '@/lib/utils';
import useOwner from '@/hooks/use-owner';
import Tooltip from '@/components/ui/tooltip';
import useRoomOptions from '@/hooks/use-room-options';
import { DEFAULT_CATEGORIES_ARABIC } from '@/config/word';

import WordAddClass from './word-class-add';
import WordSettingHeader from './word-setting-header';
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
    <div className="space-y-8">
      <WordSettingHeader title="اختر الفئات">
        <Tooltip
          position="top"
          text={!isOwner ? 'فقط صاحب الغرفة يستطيع التعديل' : undefined}
          className="text-sm"
        >
          <div
            className={cn(
              'space-x-2 rtl:space-x-reverse cursor-pointer',
              !isOwner && 'opacity-70 cursor-not-allowed'
            )}
            onClick={() => isOwner && resetClasses()}
          >
            <span>استرجاع</span>
            <FiRefreshCcw className="inline" />
          </div>
        </Tooltip>
      </WordSettingHeader>
      <WordSelectClasses classes={classes} onDelete={deleteClass} />
      {isOwner && (
        <WordAddClass
          value={className}
          setValue={(newValue) => setClassName(newValue)}
          onClassAdd={addClass}
        />
      )}
    </div>
  );
};

export default WordClassSettings;
