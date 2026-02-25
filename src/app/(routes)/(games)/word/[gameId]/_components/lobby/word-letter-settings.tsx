import toast from 'react-hot-toast';

import useOwner from '@/hooks/use-owner';
import useGameStore from '@/state/game';
import Switch from '@/components/ui/switch';
import TabList from '@/components/ui/tab-list';
import TabItem from '@/components/ui/tab-item';
import { useTranslations } from 'next-intl';
import {
  CHARS_ARABIC,
  CHARS_ENGLISH,
  DEFAULT_CHARS_NUMBER,
} from '@/config/word';
import useRoomOptions from '@/hooks/use-room-options';

import WordSelectLetters from './word-select-letters';

interface WordLetterSettingsProps {}

const WordLetterSettings: React.FC<WordLetterSettingsProps> = ({}) => {
  const { currentOptions, updateRoomOptions, savedGameSettings } = useRoomOptions();
  const chosenLetters = currentOptions?.letters || [];
  const doneLetters = useGameStore((state) => state.game?.doneLetters) || [];
  const isOwner = useOwner();

  const isArabic = CHARS_ARABIC.includes(chosenLetters[0] ?? '');
  const alphabet = isArabic ? CHARS_ARABIC : CHARS_ENGLISH;
  const t = useTranslations('WordLobby');

  const handleLetterClick = (letter: string, checked: boolean) => {
    if (!checked) {
      if (chosenLetters.length <= 1) return;
      return setRoomLetters(chosenLetters.filter((l) => l !== letter));
    }
    setRoomLetters([...chosenLetters, letter]);
  };

  const handleCheckAll = (checked: boolean) => {
    if (checked) return setRoomLetters(alphabet);
    return setRoomLetters([alphabet[0]]);
  };

  const handleLanguageSwitch = (index: number) => {
    if (!isOwner) return;
    const lang = index === 0 ? 'ar' : 'en';
    const fullAlphabet = index === 0 ? CHARS_ARABIC : CHARS_ENGLISH;
    const saved = savedGameSettings?.lettersByLanguage?.[lang];
    setRoomLetters(saved ?? fullAlphabet.slice(0, DEFAULT_CHARS_NUMBER));
  };

  const setRoomLetters = async (letters: string[]) => {
    if (!currentOptions) return toast.error('Current options not found');
    const error = await updateRoomOptions({ ...currentOptions, letters });
    if (error) {
      toast.error(error);
    }
  };

  return (
    <div className="space-y-6 px-4 py-10 pb-6">
      {/* Language Toggle */}
      <TabList
        activeTabIndex={isArabic ? 0 : 1}
        className="mx-auto w-fit gap-1 rounded-full bg-word-secondary/40"
        activeClassName="bg-word-secondary rounded-full shadow-lg"
        inactiveTabSwitchClassName="font-semibold"
        tabSwitchClassName="px-6 font-bold text-white py-2.5"
        onTabChange={handleLanguageSwitch}
      >
        <TabItem label={t('arabicLetters')} className="mt-6">
          <WordSelectLetters
            alphabet={CHARS_ARABIC}
            chosenLetters={chosenLetters}
            doneLetters={doneLetters}
            onLetterUpdate={handleLetterClick}
          />
        </TabItem>
        <TabItem label="English" className="mt-6">
          <WordSelectLetters
            alphabet={CHARS_ENGLISH}
            chosenLetters={chosenLetters}
            doneLetters={doneLetters}
            onLetterUpdate={handleLetterClick}
          />
        </TabItem>
      </TabList>

      {/* All Letters Toggle */}
      <div className="flex items-center justify-center gap-3">
        <span className="font-semibold text-white">{t('allLetters')}</span>
        <Switch
          className="peer-checked:bg-word-secondary/80"
          disabled={!isOwner}
          onChange={(e) => handleCheckAll(e.target.checked)}
          checked={chosenLetters.length === alphabet.length}
          tooltip={!isOwner ? t('ownerOnly') : undefined}
          tooltipClassName="text-sm"
          tooltipPosition="top"
        />
      </div>
    </div>
  );
};

export default WordLetterSettings;
