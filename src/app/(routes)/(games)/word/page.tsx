import Link from 'next/link';
import { Metadata } from 'next';

import { WORD_GAME_NAME } from '@/config/word';

import { APP_NAME_EN } from '@/config/constants';
import WordLogo from '@/components/word/word-logo';
import WelcomeUserText from '@/components/user/welcome-user-text';

import WordDescription from './_components/word-description';
import WordHomeButtons from './_components/word-home-buttons';

export const metadata: Metadata = {
  title: `${APP_NAME_EN} | ${WORD_GAME_NAME}`,
};

export default function WordHomePage() {
  return (
    <div className="px-4 py-8 h-screen text-white space-y-12 sm:space-y-24">
      <div className="space-y-6 lg:space-y-8">
        <Link href="/word">
          <WordLogo size={100} className="cursor-pointer" />
        </Link>
        <WelcomeUserText />
        <WordDescription />
      </div>
      <WordHomeButtons />
    </div>
  );
}
