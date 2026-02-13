import { FaUserGroup } from 'react-icons/fa6';
import { IoGameController } from 'react-icons/io5';

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
    <div className="flex flex-col items-center gap-2 py-8 px-6">
      {/* Number of Players */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <FaUserGroup className="text-white text-lg" />
          <span className="text-white font-semibold text-base">
            عدد اللاعبين
          </span>
        </div>
        <WordNumberStepper
          value={maxPlayers}
          options={playerOptions}
          disabled={!isOwner}
          tooltip="فقط صاحب الغرفة يستطيع التعديل"
          onChange={handleMaxPlayers}
        />
      </div>

      {/* Number of Rounds */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <IoGameController className="text-white text-lg" />
          <span className="text-white font-semibold text-base">
            عدد الجولات
          </span>
        </div>
        <WordNumberStepper
          value={rounds}
          options={roundOptions}
          disabled={!isOwner}
          tooltip="فقط صاحب الغرفة يستطيع التعديل"
          onChange={handleRounds}
        />
      </div>
    </div>
  );
};

export default WordGeneralSettings;
