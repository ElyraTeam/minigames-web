'use client';

import { useLocale, useTranslations } from 'next-intl';
import { IoGlobe } from 'react-icons/io5';

import { setLocale } from '@/actions/locale';

interface LanguageSelectProps {
  size?: 'sm' | 'md';
}

const LanguageSelect: React.FC<LanguageSelectProps> = ({ size = 'md' }) => {
  const t = useTranslations('Settings');
  const locale = useLocale();

  const selectClassName =
    size === 'sm'
      ? `
        rounded-lg border border-gray-200 bg-gray-50 px-1.5 py-1 text-xs
        font-medium text-gray-700
        focus:outline-none
      `
      : `
        rounded-lg border border-gray-200 bg-gray-50 px-2 py-1.5 text-sm
        font-medium text-gray-700
        focus:outline-none
      `;

  return (
    <div className="flex items-center gap-1.5">
      <IoGlobe
        className={
          size === 'sm' ? 'text-lg text-gray-400' : 'text-xl text-gray-400'
        }
      />
      <select
        value={locale}
        onChange={(e) => setLocale(e.target.value)}
        className={selectClassName}
      >
        <option value="ar">{t('arabic')}</option>
        <option value="en">{t('english')}</option>
      </select>
    </div>
  );
};

export default LanguageSelect;
