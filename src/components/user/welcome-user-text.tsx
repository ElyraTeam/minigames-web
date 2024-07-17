import Link from 'next/link';

import UsernameText from './username-text';

interface WelcomeUserTextProps {}

const WelcomeUserText: React.FC<WelcomeUserTextProps> = ({}) => {
  return (
    <h1 className="text-3xl lg:text-5xl">
      مرحبا <UsernameText />!
      <Link href="/getstarted">
        <span className="text-lg sm:text-xl px-2 cursor-pointer hover:text-word-primary">
          (تغيير)
        </span>
      </Link>
    </h1>
  );
};

export default WelcomeUserText;
