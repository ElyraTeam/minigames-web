import { FaHeart } from 'react-icons/fa';

import AuthorModal from '@/components/modals/author-modal';

interface FooterProps {}

const Footer: React.FC<FooterProps> = ({}) => {
  return (
    <footer className="
      fixed bottom-0 left-0 hidden w-full items-end justify-between px-8 py-2
      text-white
      lg:flex
    ">
      <AuthorModal>
        صنع بالـ
        <FaHeart className="inline text-red-500" /> بواسطة فريق{' '}
      </AuthorModal>
      <p>جميع الحقوق محفوظة &copy; {new Date().getFullYear()}</p>
    </footer>
  );
};

export default Footer;
