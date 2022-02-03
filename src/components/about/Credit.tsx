import classNames from 'classnames';
import Image from 'next/image';
import { FaFacebook, FaGithub, FaLinkedin } from 'react-icons/fa';
import SocialLink from '../shared/SocialLink';

interface CreditProps {
  credit: UserCredit;
  className?: string;
}

const Credit: React.FC<CreditProps> = ({ credit, className }) => {
  const { name, facebookLink, linkedinLink, githubLink } = credit;
  return (
    <div className={classNames('flex justify-between', className)} dir="rtl">
      <p>{name}</p>
      <div className="flex align-middle text-xl">
        {githubLink && (
          <SocialLink link={githubLink}>
            <FaGithub />
          </SocialLink>
        )}
        {linkedinLink && (
          <SocialLink link={linkedinLink}>
            <FaLinkedin />
          </SocialLink>
        )}
        {facebookLink && (
          <SocialLink link={facebookLink}>
            <FaFacebook />
          </SocialLink>
        )}
      </div>
    </div>
  );
};

export default Credit;
