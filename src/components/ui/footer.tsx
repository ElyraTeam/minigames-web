import AuthorModal from '@/components/modals/author-modal';

interface FooterProps {}

const Footer: React.FC<FooterProps> = ({}) => {
  return (
    <footer className="fixed flex items-end justify-between bottom-0 left-0 text-white p-2 w-full">
      <AuthorModal />
      <p>جميع الحقوق محفوظة &copy; {new Date().getFullYear()}</p>
    </footer>
  );
};

export default Footer;
