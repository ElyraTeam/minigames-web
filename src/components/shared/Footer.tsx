import { useEffect, useState } from 'react';
import { FaHeart } from 'react-icons/fa';
import { CREDITS, TEAM_NAME_EN } from '../../config/constants';
import { shuffle } from '../../helpers/utils';

interface FooterProps {}

const Footer: React.FC<FooterProps> = ({}) => {
  const [showCreds, setShowCreds] = useState(false);
  const [creds, setCreds] = useState<UserCredit[]>([]);

  const shuffleCredits = () => setCreds(shuffle(CREDITS));

  useEffect(() => {
    shuffleCredits();
  }, []);

  return (
    <div className="footer absolute bottom-0 left-0 w-full text-white overflow-hidden p-2 z-10">
      <p className="float-left">
        Made with <FaHeart className="inline text-[#f00]" /> by{' '}
        <span
          onClick={() => {
            setShowCreds((oldShow) => {
              const show = !oldShow;
              if (show) {
                shuffleCredits();
              }
              return show;
            });
          }}
        >
          {TEAM_NAME_EN}
        </span>{' '}
        Team
      </p>
      <p className="float-right">
        All rights reserved &copy; {new Date().getFullYear()}
      </p>
    </div>
  );
};

export default Footer;
