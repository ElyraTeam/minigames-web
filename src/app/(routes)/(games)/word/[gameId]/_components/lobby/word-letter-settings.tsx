import { useState } from 'react';

import useOwner from '@/hooks/use-owner';
import Switch from '@/components/ui/switch';
import { CHARS_ARABIC } from '@/config/word';

import WordSettingHeader from './word-setting-header';
import WordSelectLetters from './word-select-letters';

interface WordLetterSettingsProps {}

const WordLetterSettings: React.FC<WordLetterSettingsProps> = ({}) => {
  const [chosenLetters, setChosenLetters] = useState<string[]>([]);
  const isOwner = useOwner();

  const handleLetterClick = (letter: string, checked: boolean) => {
    console.log(chosenLetters);
    if (!checked)
      return setChosenLetters(chosenLetters.filter((l) => l !== letter));
    setChosenLetters([...chosenLetters, letter]);
  };

  const handleCheckAll = (checked: boolean) => {
    if (checked) return setChosenLetters(CHARS_ARABIC);
    return setChosenLetters([]);
  };

  return (
    <div className="space-y-3">
      <WordSettingHeader title="اختر الحروف">
        <div className="flex items-center gap-3">
          <p>كل الحروف</p>
          <Switch
            className="peer-checked:bg-word-secondary/40 peer-checked:before:bg-word-secondary"
            disabled={!isOwner}
            onChange={(e) => handleCheckAll(e.target.checked)}
            checked={chosenLetters.length === CHARS_ARABIC.length}
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
