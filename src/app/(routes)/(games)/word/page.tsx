import { Metadata } from 'next';

import { WORD_GAME_NAME } from '@/config/word';
import { APP_NAME_EN } from '@/config/constants';

import WordAppbar from './_components/word-appbar';
import WordPlayHeader from './_components/word-play-header';
import WordHomeSection from './_components/word-home-section';
import WordExperience from './_components/word-experience';
import WordCompetitive from './_components/word-competitive';

export const metadata: Metadata = {
  title: `${APP_NAME_EN} | ${WORD_GAME_NAME}`,
};

export default function WordHomePage() {
  return (
    <div className="min-h-screen">
      <WordAppbar />
      <WordHomeSection />
      <WordPlayHeader />
      <WordExperience />
      <WordCompetitive />
    </div>
  );
}
