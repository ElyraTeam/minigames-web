import { FaLock } from 'react-icons/fa';

import useOwner from '@/hooks/use-owner';

import WordGameContainer from '../word-game-container';
import WordSettingCard from './word-setting-card';
import WordClassSettings from './word-class-settings';
import WordLetterSettings from './word-letter-settings';
import WordGeneralSettings from './word-general-settings';

interface WordGameSettingsProps {}

const WordGameSettings: React.FC<WordGameSettingsProps> = ({}) => {
  const isOwner = useOwner();

  return (
    <WordGameContainer className="animate-in fade-in duration-500 space-y-8">
      {!isOwner && (
        <div className="relative pt-4">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 z-10">
            <div className="bg-white/20 rounded-full p-2.5">
              <FaLock className="text-white text-xl" />
            </div>
          </div>
          <div className="flex items-center justify-center bg-black/10 rounded-xl py-4 pt-7 px-6">
            <span className="text-white font-bold text-base">
              فقط صاحب الغرفة يستطيع التعديل
            </span>
          </div>
        </div>
      )}
      <WordSettingCard title="اعدادات عامة">
        <WordGeneralSettings />
      </WordSettingCard>

      <WordSettingCard title="اختر الحروف">
        <WordLetterSettings />
      </WordSettingCard>

      <WordSettingCard title="اختر الفئات">
        <WordClassSettings />
      </WordSettingCard>
    </WordGameContainer>
  );
};

export default WordGameSettings;
