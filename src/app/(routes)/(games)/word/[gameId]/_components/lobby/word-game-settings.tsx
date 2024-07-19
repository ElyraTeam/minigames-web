import WordGameContainer from '../word-game-container';
import WordCategoryHeader from './word-category-header';
import WordLetterSettings from './word-letter-settings';
import WordGeneralSettings from './word-general-settings';

interface WordGameSettingsProps {}

const WordGameSettings: React.FC<WordGameSettingsProps> = ({}) => {
  return (
    <WordGameContainer>
      <WordCategoryHeader>الإعدادات العامة</WordCategoryHeader>
      <WordGeneralSettings />
      <WordCategoryHeader>تخصيص اللعبة</WordCategoryHeader>
      <WordLetterSettings />
    </WordGameContainer>
  );
};

export default WordGameSettings;
