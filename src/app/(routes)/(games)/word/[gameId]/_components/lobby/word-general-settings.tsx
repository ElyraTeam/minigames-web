import { FaUserGroup } from 'react-icons/fa6';
import { IoGameController } from 'react-icons/io5';
import { useTranslations } from 'next-intl';

import useOwner from '@/hooks/use-owner';
import useRoomOptions from '@/hooks/use-room-options';
import { DEFAULT_MAX_PLAYERS, DEFAULT_ROUNDS } from '@/config/word';

import WordNumberStepper from './word-number-stepper';

interface WordGeneralSettingsProps {}

const WordGeneralSettings: React.FC<WordGeneralSettingsProps> = ({}) => {
  const { currentOptions, updateRoomOptions } = useRoomOptions();
  const maxPlayers = currentOptions?.maxPlayers || DEFAULT_MAX_PLAYERS;
  const rounds = currentOptions?.rounds || DEFAULT_ROUNDS;
  const lettersNumber = currentOptions?.letters.length || 1;
  const isOwner = useOwner();
  const t = useTranslations('WordLobby');

  const handleMaxPlayers = (newMaxPlayers: number) => {
    if (!currentOptions) return;
    updateRoomOptions({ ...currentOptions, maxPlayers: newMaxPlayers });
  };

  const handleRounds = (newRounds: number) => {
    if (!currentOptions) return;
    updateRoomOptions({ ...currentOptions, rounds: newRounds });
  };

  const playerOptions = Array.from({ length: 15 }, (_, i) => i + 2);
  const roundOptions = Array.from({ length: lettersNumber }, (_, i) => i + 1);

  return (
    <div className="flex flex-col items-center gap-2 px-6 py-8">
      {/* Number of Players */}
      <div className="flex w-50 items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <FaUserGroup className="text-lg text-white" />
          <span className="text-base font-semibold text-white">
            {t('maxPlayers')}
          </span>
        </div>
        <WordNumberStepper
          value={maxPlayers}
          options={playerOptions}
          disabled={!isOwner}
          tooltip={t('ownerOnly')}
          onChange={handleMaxPlayers}
        />
      </div>

      {/* Number of Rounds */}
      <div className="flex w-50 items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <IoGameController className="text-lg text-white" />
          <span className="text-base font-semibold text-white">
            {t('rounds')}
          </span>
        </div>
        <WordNumberStepper
          value={rounds}
          options={roundOptions}
          disabled={!isOwner}
          tooltip={t('ownerOnly')}
          onChange={handleRounds}
        />
      </div>
    </div>
  );
};

export default WordGeneralSettings;
