import { FaHeart } from 'react-icons/fa';

import AuthorModal from '@/components/modals/author-modal';

interface FooterProps {}

const Footer: React.FC<FooterProps> = ({}) => {
  return (
    <footer className="fixed flex items-end justify-between bottom-0 left-0 text-white py-2 px-8 w-full">
      <AuthorModal>
        صنع بالـ
        <FaHeart className="inline text-red-500" /> بواسطة فريق{' '}
      </AuthorModal>
      <p>جميع الحقوق محفوظة &copy; {new Date().getFullYear()}</p>
    </footer>
  );
};

export default Footer;
