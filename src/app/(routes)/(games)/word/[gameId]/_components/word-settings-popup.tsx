'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { IoSettingsSharp, IoVolumeHigh } from 'react-icons/io5';

import Switch from '@/components/ui/switch';
import useLocalStore from '@/state/local';
import Modal from '@/components/modals/modal';
import LanguageSelect from '@/components/ui/language-select';

import WordHeaderIcon from './word-header-icon';

interface WordSettingsPopupProps {
  theme?: 'light' | 'dark';
}

const WordSettingsPopup: React.FC<WordSettingsPopupProps> = ({
  theme = 'dark',
}) => {
  const [open, setOpen] = useState(false);
  const t = useTranslations('Settings');
  const isMuted = useLocalStore((state) => state.isMuted);
  const toggleMute = useLocalStore((state) => state.toggleMute);

  return (
    <>
      <WordHeaderIcon theme={theme} onClick={() => setOpen(true)}>
        <IoSettingsSharp className="text-xl" />
      </WordHeaderIcon>

      <Modal
        isOpen={open}
        onOpenChange={setOpen}
        className="w-72 space-y-5 px-6 pb-6"
      >
        {/* Language row */}
        <div className="flex items-center justify-between gap-4">
          <LanguageSelect />
          <div className="flex items-center gap-2">
            <span className="font-semibold text-gray-800">{t('language')}</span>
          </div>
        </div>

        {/* Sound row */}
        <div className="flex items-center justify-between gap-4">
          <Switch
            checked={!isMuted}
            onChange={toggleMute}
            className="peer-checked:bg-word-secondary/80"
          />
          <div className="flex items-center gap-2">
            <span className="font-semibold text-gray-800">{t('sound')}</span>
            <IoVolumeHigh className="text-2xl text-gray-500" />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default WordSettingsPopup;
