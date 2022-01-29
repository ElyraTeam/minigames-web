import { openInNewTab } from '../../helpers/utils';

interface SocialLinkProps {
  link: string;
}

const SocialLink: React.FC<SocialLinkProps> = ({ link, children }) => {
  return (
    <div
      className="cursor-pointer mx-4 hover:text-primary transition-colors"
      onClick={() => openInNewTab(link)}
    >
      {children}
    </div>
  );
};

export default SocialLink;
