import { Metadata, Viewport } from 'next';

import { WORD_GAME_NAME } from '@/config/word';
import { defaultWordMetadata } from '@/config/metadata';
import WordBackground from '@/components/word/word-background';

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
    url: `/word`,
  },
};

export default async function WordLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <WordBackground className="text-white scrollbar-thumb-word-secondary scrollbar-track-transparent scrollbar-thumb-rounded-lg">
      {children}
    </WordBackground>
  );
}
