import { FaGithub, FaLinkedin, FaFacebook } from 'react-icons/fa';

import SocialLink from './social-link';

interface ListSocialProps {
  githubLink?: string;
  linkedinLink?: string;
  facebookLink?: string;
}

const ListSocial: React.FC<ListSocialProps> = ({
  githubLink,
  linkedinLink,
  facebookLink,
}) => {
  return (
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
  );
};

export default ListSocial;
