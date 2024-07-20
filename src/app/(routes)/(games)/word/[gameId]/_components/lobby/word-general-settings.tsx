import { FaLock } from 'react-icons/fa';
import { FaUserGroup } from 'react-icons/fa6';
import { IoGameController } from 'react-icons/io5';

import useOwner from '@/hooks/use-owner';
import Switch from '@/components/ui/switch';
import Select from '@/components/ui/select';
import useRoomOptions from '@/hooks/use-room-options';
import { DEFAULT_MAX_PLAYERS, DEFAULT_ROUNDS } from '@/config/word';

import WordGeneralOption from './word-general-option';

interface WordGeneralSettingsProps {}

const WordGeneralSettings: React.FC<WordGeneralSettingsProps> = ({}) => {
  const { currentOptions, updateRoomOptions } = useRoomOptions();
  const maxPlayers = currentOptions?.maxPlayers || DEFAULT_MAX_PLAYERS;
  const rounds = currentOptions?.rounds || DEFAULT_ROUNDS;
  const isPrivate = currentOptions?.isPrivate || false;
  const lettersNumber = currentOptions?.letters.length || 0;
  const isOwner = useOwner();

  const handlePrivacy = (privacy: boolean) => {
    if (!currentOptions) return;
    updateRoomOptions({ ...currentOptions, isPrivate: privacy });
  };

  const handleMaxPlayers = (newMaxPlayers: string) => {
    if (!currentOptions || Number.isNaN(+newMaxPlayers)) return;
    updateRoomOptions({ ...currentOptions, maxPlayers: +newMaxPlayers });
  };

  const handleRounds = (newRounds: string) => {
    if (!currentOptions || Number.isNaN(+newRounds)) return;
    updateRoomOptions({ ...currentOptions, rounds: +newRounds });
  };

  return (
    <>
      <WordGeneralOption
        title="عدد اللاعبين"
        description="أقصي عدد من اللاعبين مسموح في الغرفة"
        icon={<FaUserGroup className="text-4xl" />}
      >
        <Select
          className="bg-word-secondary/50 w-20 scrollbar-track-word-secondary/20"
          value={maxPlayers}
          disabled={!isOwner}
          onChange={(e) => handleMaxPlayers(e.target.value)}
          tooltip={!isOwner ? 'فقط صاحب الغرفة يستطيع التعديل' : undefined}
          tooltipClassName="text-sm"
          tooltipPosition="top"
        >
          {Array.from(new Array(15), (_, index) => (
            <option
              key={`round-key-${index}`}
              className="bg-word-secondary/80"
              value={index + 2}
            >
              {index + 2}
            </option>
          ))}
        </Select>
      </WordGeneralOption>
      <WordGeneralOption
        title="عدد الجولات"
        description="عدد الجولات التي تلعب قبل تحديد الفائز"
        icon={<IoGameController className="text-4xl" />}
      >
        <Select
          className="bg-word-secondary/50 w-20 scrollbar-thin scrollbar-track-word-secondary/20"
          value={rounds}
          disabled={!isOwner}
          onChange={(e) => handleRounds(e.target.value)}
          tooltip={!isOwner ? 'فقط صاحب الغرفة يستطيع التعديل' : undefined}
          tooltipClassName="text-sm"
          tooltipPosition="top"
        >
          {Array.from(new Array(lettersNumber), (_, index) => (
            <option
              key={`round-key-${index}`}
              className="bg-word-secondary/80"
              value={index + 1}
            >
              {index + 1}
            </option>
          ))}
        </Select>
      </WordGeneralOption>
      <WordGeneralOption
        title="غرفة خاصة"
        description="لن يتمكن أحد بدون رابط الغرفة من الدخول لها"
        icon={<FaLock className="text-4xl" />}
      >
        <Switch
          className="peer-checked:bg-word-secondary/80"
          disabled={!isOwner}
          checked={isPrivate}
          onChange={(e) => handlePrivacy(e.target.checked)}
          tooltip={!isOwner ? 'فقط صاحب الغرفة يستطيع التعديل' : undefined}
          tooltipClassName="text-sm"
          tooltipPosition="top"
        />
      </WordGeneralOption>
    </>
  );
};

export default WordGeneralSettings;
