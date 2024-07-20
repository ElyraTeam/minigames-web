import toast from 'react-hot-toast';
import { FiRefreshCcw } from 'react-icons/fi';

import useRoomOptions from '@/hooks/use-room-options';
import { DEFAULT_CATEGORIES_ARABIC } from '@/config/word';

import WordAddClass from './word-class-add';
import WordSettingHeader from './word-setting-header';
import WordSelectClasses from './word-select-classes';

interface WordClassSettingsProps {}

const WordClassSettings: React.FC<WordClassSettingsProps> = ({}) => {
  const { currentOptions, updateRoomOptions } = useRoomOptions();
  const classes = currentOptions?.categories || [];

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
  };

  return (
    <div className="space-y-8">
      <WordSettingHeader title="اختر الفئات">
        <div
          className="space-x-2 rtl:space-x-reverse cursor-pointer"
          onClick={resetClasses}
        >
          <span>استرجاع</span>
          <FiRefreshCcw className="inline" />
        </div>
      </WordSettingHeader>
      <WordSelectClasses classes={classes} onDelete={deleteClass} />
      <WordAddClass onClassAdd={addClass} />
    </div>
  );
};

export default WordClassSettings;
