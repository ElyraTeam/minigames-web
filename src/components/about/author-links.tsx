import Image from 'next/image';

import SocialLink from './social-link';

interface AuthorLinksProps {}

const AuthorLinks: React.FC<AuthorLinksProps> = ({}) => {
  return (
    <div className="flex justify-center items-center mt-6">
      <SocialLink
        link="https://github.com/ElyraTeam/minigames-web"
        className="hover:opacity-75"
      >
        <Image src="/svg/github.svg" width="25" height="25" alt="github" />
      </SocialLink>
      <SocialLink link="" className="hover:opacity-75">
        <Image src="/svg/twitter.svg" width="25" height="25" alt="twitter" />
      </SocialLink>
      <SocialLink link="" className="hover:opacity-75">
        <Image src="/svg/facebook.svg" width="25" height="25" alt="facebook" />
      </SocialLink>
    </div>
  );
};

export default AuthorLinks;
