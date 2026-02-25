import { useState } from 'react';
import toast from 'react-hot-toast';
import { FiRefreshCcw } from 'react-icons/fi';
import { useLocale, useTranslations } from 'next-intl';

import { cn } from '@/lib/utils';
import useOwner from '@/hooks/use-owner';
import Tooltip from '@/components/ui/tooltip';
import useRoomOptions from '@/hooks/use-room-options';
import {
  DEFAULT_CATEGORIES_ARABIC,
  DEFAULT_CATEGORIES_ENGLISH,
} from '@/config/word';

import WordClassAdd from './word-class-add';
import WordSelectClasses from './word-select-classes';

interface WordClassSettingsProps {}

const WordClassSettings: React.FC<WordClassSettingsProps> = ({}) => {
  const [className, setClassName] = useState('');
  const { currentOptions, updateRoomOptions } = useRoomOptions();
  const classes = currentOptions?.categories || [];
  const isOwner = useOwner();
  const locale = useLocale();
  const t = useTranslations('WordLobby');

  const deleteClass = (className: string) => {
    if (!classes.includes(className)) return;
    setRoomCategories(classes.filter((c) => c !== className));
  };

  const setRoomCategories = async (categories: string[]) => {
    if (!currentOptions) return toast.error(t('currentOptionsNotFound'));
    const error = await updateRoomOptions({ ...currentOptions, categories });
    if (error) {
      toast.error(error);
    }
  };

  const resetClasses = () => {
    const defaults =
      locale === 'ar' ? DEFAULT_CATEGORIES_ARABIC : DEFAULT_CATEGORIES_ENGLISH;
    setRoomCategories(defaults);
  };

  const addClass = (className: string) => {
    if (className.trim().length == 0) return;
    if (classes.includes(className))
      return toast.error(t('duplicateCategory'));
    setRoomCategories([...classes, className]);
    setClassName('');
  };

  return (
    <div className="space-y-6 px-4 py-10 pb-6">
      {/* Categories Grid */}
      <WordSelectClasses classes={classes} onDelete={deleteClass} />

      {/* Bottom row: Add Input + Restore link */}
      <div
        className="
          flex flex-col items-center gap-4
          lg:gap-6
        "
      >
        {/* Add Category Input */}
        <div
          className="
            w-full
            lg:max-w-[320px]
          "
        >
          <WordClassAdd
            value={className}
            setValue={(newValue) => setClassName(newValue)}
            onClassAdd={addClass}
          />
        </div>

        {/* Restore Link */}
        <Tooltip
          position="top"
          text={!isOwner ? t('ownerOnly') : undefined}
          className="text-sm"
        >
          <button
            className={cn(
              `
                flex cursor-pointer items-center justify-center gap-2
                transition-opacity
                hover:opacity-80
              `,
              !isOwner && 'cursor-not-allowed! opacity-70',
            )}
            onClick={() => isOwner && resetClasses()}
            disabled={!isOwner}
          >
            <div
              className="
                flex size-7 items-center justify-center rounded-full
                bg-word-secondary
              "
            >
              <FiRefreshCcw className="text-sm text-white" />
            </div>
            <span className="font-semibold text-white">{t('restore')}</span>
          </button>
        </Tooltip>
      </div>
    </div>
  );
};

export default WordClassSettings;
