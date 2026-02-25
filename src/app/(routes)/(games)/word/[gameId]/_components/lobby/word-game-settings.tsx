import { FaLock } from 'react-icons/fa';
import { useTranslations } from 'next-intl';

import useOwner from '@/hooks/use-owner';

import WordGameContainer from '../word-game-container';
import WordSettingCard from './word-setting-card';
import WordClassSettings from './word-class-settings';
import WordLetterSettings from './word-letter-settings';
import WordGeneralSettings from './word-general-settings';

interface WordGameSettingsProps {}

const WordGameSettings: React.FC<WordGameSettingsProps> = ({}) => {
  const isOwner = useOwner();
  const t = useTranslations('WordLobby');

  return (
    <WordGameContainer className="space-y-8 duration-500 animate-in fade-in">
      {!isOwner && (
        <div className="relative pt-4">
          <div className="absolute top-0 left-1/2 z-10 -translate-x-1/2">
            <div className="rounded-full bg-white/20 p-2.5">
              <FaLock className="text-xl text-white" />
            </div>
          </div>
          <div className="
            flex items-center justify-center rounded-xl bg-black/10 px-6 py-4
            pt-7
          ">
            <span className="text-base font-bold text-white">
              {t('ownerOnly')}
            </span>
          </div>
        </div>
      )}
      <WordSettingCard title={t('generalSettings')}>
        <WordGeneralSettings />
      </WordSettingCard>

      <WordSettingCard title={t('chooseLetters')}>
        <WordLetterSettings />
      </WordSettingCard>

      <WordSettingCard title={t('chooseCategories')}>
        <WordClassSettings />
      </WordSettingCard>
    </WordGameContainer>
  );
};

export default WordGameSettings;
