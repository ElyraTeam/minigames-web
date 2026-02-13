import WordGameContainer from '../word-game-container';
import WordSettingCard from './word-setting-card';
import WordClassSettings from './word-class-settings';
import WordLetterSettings from './word-letter-settings';
import WordGeneralSettings from './word-general-settings';

interface WordGameSettingsProps {}

const WordGameSettings: React.FC<WordGameSettingsProps> = ({}) => {
  return (
    <WordGameContainer className="animate-in fade-in duration-500">
      <WordSettingCard title="اعدادات عامة" className='mt-4'>
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
