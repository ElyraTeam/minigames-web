import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { FaHeart } from 'react-icons/fa';
import { CREDITS, TEAM_NAME_EN } from '../../config/constants';
import { shuffle } from '../../helpers/utils';
import Credit from '../about/Credit';
import Card from './Card';
import OutlineButton from './OutlineButton';

interface FooterProps { }

const Footer: React.FC<FooterProps> = ({ }) => {
  const [showCreds, setShowCreds] = useState(false);
  const [creds, setCreds] = useState<UserCredit[]>([]);

  const shuffleCredits = () => setCreds(shuffle(CREDITS));

  useEffect(() => {
    shuffleCredits();
  }, []);

  return (
    <div className="footer fixed flex items-end justify-between bottom-0 left-0 w-full h-full text-white p-2 z-60">
      <p className="">
        Made with <FaHeart className="inline text-[#f00]" /> by{' '}
        <span className="text-primary cursor-pointer hover:text-[#0f0]"
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
      <p className="">
        All rights reserved &copy; {new Date().getFullYear()}
      </p>

      <Card
        className={classNames(
          "absolute w-[30rem] bg-white text-black rounded-2xl transition-transform duration-500 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40",
          {
            "scale-[0]": !showCreds,
          }
        )}
      >
        {creds.map((u, i) => (
          <div key={i}>
            <Credit credit={u} className="my-4" />
            {i >= 0 && i != CREDITS.length - 1 && (
              <hr className="border-[#eee] border-b-[2px]" />
            )}
          </div>
        ))}
        <OutlineButton
          className="w-28 self-center mt-8"
          onClick={() => setShowCreds(false)}
        >
          إغلاق
        </OutlineButton>
      </Card>

      <div
        className={classNames(
          "overlay absolute h-full w-full top-0 left-0 cursor-pointer bg-[rgba(0,0,0,0.4)] z-30",
          {
            hidden: !showCreds,
          }
        )}
        onClick={() => setShowCreds(false)}></div>
    </div>
  );
};

export default Footer;
