import toast from 'react-hot-toast';

import useOwner from '@/hooks/use-owner';
import useGameStore from '@/state/game';
import Switch from '@/components/ui/switch';
import { CHARS_ARABIC } from '@/config/word';
import useRoomOptions from '@/hooks/use-room-options';

import WordSelectLetters from './word-select-letters';

interface WordLetterSettingsProps {}

const WordLetterSettings: React.FC<WordLetterSettingsProps> = ({}) => {
  const { currentOptions, updateRoomOptions } = useRoomOptions();
  const chosenLetters = currentOptions?.letters || [];
  const doneLetters = useGameStore((state) => state.game?.doneLetters) || [];
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
    <div className="py-10 pb-6 px-4 space-y-6">
      <WordSelectLetters
        chosenLetters={chosenLetters}
        doneLetters={doneLetters}
        onLetterUpdate={handleLetterClick}
      />
      {/* All Letters Toggle */}
      <div className="flex items-center justify-center gap-3">
        <span className="text-white font-semibold">كل الحروف</span>
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
    </div>
  );
};

export default WordLetterSettings;
