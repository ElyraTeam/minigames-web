import { FaLock } from 'react-icons/fa';
import { FaUserGroup } from 'react-icons/fa6';
import { IoGameController } from 'react-icons/io5';

import useOwner from '@/hooks/use-owner';
import Switch from '@/components/ui/switch';
import Select from '@/components/ui/select';
import { DEFAULT_MAX_PLAYERS, DEFAULT_ROUNDS } from '@/config/word';

import WordGeneralOption from './word-general-option';

interface WordGeneralSettingsProps {}

const WordGeneralSettings: React.FC<WordGeneralSettingsProps> = ({}) => {
  const isOwner = useOwner();

  return (
    <>
      <WordGeneralOption
        title="عدد اللاعبين"
        description="أقصي عدد من اللاعبين مسموح في الغرفة"
        icon={<FaUserGroup className="text-4xl" />}
      >
        <Select
          className="bg-word-secondary/50"
          defaultValue={DEFAULT_MAX_PLAYERS}
          disabled={!isOwner}
        >
          {Array.from(new Array(8), (_, index) => (
            <option
              key={`round-key-${index}`}
              className="bg-word-secondary"
              value={index + 1}
            >
              {index + 1}
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
          className="bg-word-secondary/50"
          defaultValue={DEFAULT_ROUNDS}
          disabled={!isOwner}
        >
          {Array.from(new Array(8), (_, index) => (
            <option
              key={`round-key-${index}`}
              className="bg-word-secondary"
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
          className="peer-checked:bg-word-secondary/40 peer-checked:before:bg-word-secondary"
          disabled={!isOwner}
        />
      </WordGeneralOption>
    </>
  );
};

export default WordGeneralSettings;
