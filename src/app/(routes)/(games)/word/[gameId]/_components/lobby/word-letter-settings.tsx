import toast from 'react-hot-toast';

import useOwner from '@/hooks/use-owner';
import Switch from '@/components/ui/switch';
import { CHARS_ARABIC } from '@/config/word';
import useRoomOptions from '@/hooks/use-room-options';

import WordSettingHeader from './word-setting-header';
import WordSelectLetters from './word-select-letters';

interface WordLetterSettingsProps {}

const WordLetterSettings: React.FC<WordLetterSettingsProps> = ({}) => {
  const { currentOptions, updateRoomOptions } = useRoomOptions();
  const chosenLetters = currentOptions?.letters || [];
  const isOwner = useOwner();

  const handleLetterClick = (letter: string, checked: boolean) => {
    if (!checked) {
      if (chosenLetters.length <= 1) return;
      return setRoomLetters(chosenLetters.filter((l) => l !== letter));
    }
    setRoomLetters([...chosenLetters, letter]);
  };

  const handleCheckAll = (checked: boolean) => {
    if (checked) return setRoomLetters(CHARS_ARABIC);
    return setRoomLetters([CHARS_ARABIC[0]]);
  };

  const setRoomLetters = async (letters: string[]) => {
    if (!currentOptions) return toast.error('Current options not found');
    const error = await updateRoomOptions({ ...currentOptions, letters });
    if (error) {
      toast.error(error);
    }
  };

  return (
    <div className="space-y-8">
      <WordSettingHeader title="اختر الحروف">
        <div className="flex items-center gap-3">
          <p>كل الحروف</p>
          <Switch
            className="peer-checked:bg-word-secondary/80"
            disabled={!isOwner}
            onChange={(e) => handleCheckAll(e.target.checked)}
            checked={chosenLetters.length === CHARS_ARABIC.length}
            tooltip={!isOwner ? 'فقط صاحب الغرفة يستطيع التعديل' : undefined}
            tooltipClassName="text-sm"
            tooltipPosition="top"
          />
        </div>
      </WordSettingHeader>
      <WordSelectLetters
        chosenLetters={chosenLetters}
        onLetterUpdate={handleLetterClick}
      />
    </div>
  );
};

export default WordLetterSettings;
