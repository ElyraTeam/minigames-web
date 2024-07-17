import { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { HOST } from '@/config/constants';
import checkRoomId from '@/actions/check-room';

import WordMainCard from './_components/word-main-card';

interface WordRoomPageProps {
  params: {
    gameId: string;
  };
}

export async function generateMetadata({
  params: { gameId },
}: WordRoomPageProps): Promise<Metadata> {
  return {
    description: 'Join this game of Word!',
    openGraph: {
      title: 'Join Word Game',
      description: "You're invited to join this Word game!",
      url: `${HOST}/word/${gameId}`,
    },
  };
}

const WordRoomPage: React.FC<WordRoomPageProps> = async ({
  params: { gameId },
}) => {
  const isRoomValid = await checkRoomId(gameId);

  if (!isRoomValid) redirect('/word/not-found');

  return <WordMainCard roomId={gameId} />;
};

export default WordRoomPage;
