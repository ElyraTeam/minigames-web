import classNames from 'classnames';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';
import Credit from '../../components/about/Credit';
import Card from '../../components/shared/Card';
import OutlineButton from '../../components/shared/OutlineButton';
import SlideButton from '../../components/shared/SlideButton';
import SocialLink from '../../components/shared/SocialLink';
import WordLogo from '../../components/words/shared/WordLogo';
import { APP_NAME, CREDITS, TEAM_NAME } from '../../config/constants';
import { shuffle } from '../../helpers/utils';

const creds = shuffle(CREDITS);

const Home: NextPage = () => {
  const [showCreds, setShowCreds] = useState(false);

  return (
    <div className="getstarted-main">
      <Head>
        <title>{APP_NAME} - Get Started</title>
      </Head>

      <div className="flex flex-col justify-center align-middle h-screen text-center">
        <WordLogo size="100" />
        <h2 className="text-2xl font-semibold mt-6 mb-16">!مرحبا بك في كلمة</h2>
        <SlideButton center label="ابدأ اللعب" placeholderLabel="اكتب اسمك">
          <Image src="/assets/svg/send.svg" width="25" height="25" />
        </SlideButton>
        <div className="mt-8 text-lg relative">
          تطوير{' '}
          <span
            className="text-btngradient-from cursor-pointer"
            onClick={() => setShowCreds(!showCreds)}
          >
            فريق {TEAM_NAME}
          </span>
          <Card
            className={classNames('absolute w-[30rem] transition-opacity', {
              'opacity-0': !showCreds,
            })}
          >
            {creds.map((u, i) => (
              <div>
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
              الغاء
            </OutlineButton>
          </Card>
        </div>
        <div className="flex justify-center mt-6">
          <SocialLink link="">
            <Image src="/assets/svg/facebook.svg" width="25" height="25" />
          </SocialLink>
          <SocialLink link="">
            <Image src="/assets/svg/twitter.svg" width="25" height="25" />
          </SocialLink>
          <SocialLink link="">
            <Image src="/assets/svg/github.svg" width="25" height="25" />
          </SocialLink>
        </div>
      </div>
    </div>
  );
};

export default Home;
