import { Metadata, Viewport } from 'next';

import { WORD_GAME_NAME } from '@/config/word';
import { defaultWordMetadata } from '@/config/metadata';
import WordBackground from '@/components/word/word-background';

import WordAppbar from './word/_components/word-appbar';
import WordGetPoints from './word/_components/word-get-points';
import WordExperience from './word/_components/word-experience';
import WordPlayHeader from './word/_components/word-play-header';
import WordCompetitive from './word/_components/word-competitive';
import WordHomeSection from './word/_components/word-home-section';

export const viewport: Viewport = {
  themeColor: '#0DF822',
};

export const metadata: Metadata = {
  ...defaultWordMetadata,
  title: WORD_GAME_NAME,
  openGraph: {
    ...defaultWordMetadata.openGraph,
    title: WORD_GAME_NAME,
    description: 'Play Word Game and improve your vocabulary!',
    url: `/`,
  },
};

export default function HomePage() {
  return (
    <WordBackground className="text-white scrollbar-thumb-word-secondary scrollbar-track-transparent scrollbar-thumb-rounded-lg">
      <div className="min-h-screen overflow-x-hidden">
        <WordAppbar />
        <WordHomeSection />
        <WordPlayHeader />
        <WordExperience />
        <WordCompetitive />
        <WordGetPoints />
      </div>
    </WordBackground>
  );
}
