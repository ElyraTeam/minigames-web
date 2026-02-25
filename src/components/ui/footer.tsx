import { FaHeart } from 'react-icons/fa';
import { useTranslations } from 'next-intl';

import AuthorModal from '@/components/modals/author-modal';

interface FooterProps {}

const Footer: React.FC<FooterProps> = ({}) => {
  const t = useTranslations('Footer');

  return (
    <footer className="
      fixed bottom-0 left-0 hidden w-full items-end justify-between px-8 py-2
      text-white
      lg:flex
    ">
      <AuthorModal>
        {t('madeWith')}
        <FaHeart className="inline text-red-500" /> {t('byTeam')}{' '}
      </AuthorModal>
      <p>{t('allRightsReserved')} &copy; {new Date().getFullYear()}</p>
    </footer>
  );
};

export default Footer;
