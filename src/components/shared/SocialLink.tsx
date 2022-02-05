import classNames from 'classnames';
import { openInNewTab } from '../../helpers/utils';

interface SocialLinkProps {
  link: string;
  className?: string;
}

const SocialLink: React.FC<SocialLinkProps> = ({
  link,
  className,
  children,
}) => {
  return (
    <div
      className={classNames(
        'cursor-pointer mx-4 hover:text-primary transition-colors',
        className
      )}
      onClick={() => openInNewTab(link)}
    >
      {children}
    </div>
  );
};

export default SocialLink;
