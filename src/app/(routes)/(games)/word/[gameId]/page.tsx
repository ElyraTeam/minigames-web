import { Metadata } from 'next';

import checkRoomId from '@/actions/check-room';
import { defaultWordMetadata } from '@/config/metadata';

import WordMainCard from './_components/word-main-card';

interface WordRoomPageProps {
  params: {
    gameId: string;
  };
}

export async function generateMetadata({
  params: { gameId },
}: WordRoomPageProps): Promise<Metadata> {
  try {
    const { owner } = await checkRoomId(gameId);
    if (!owner) throw new Error('Room not found');
    return {
      ...defaultWordMetadata,
      description: `Join this game of Word by ${owner}`,
      openGraph: {
        ...defaultWordMetadata.openGraph,
        title: `Join Word Game by ${owner}`,
        description: "You're invited to join this Word game!",
        url: `/word/${gameId}`,
      },
    };
  } catch (err) {
    return {
      ...defaultWordMetadata,
      title: 'Room not found',
      description: "Room doesn't exist",
      openGraph: {
        ...defaultWordMetadata.openGraph,
        title: 'Room not found',
        description: "Room doesn't exist",
        url: `/word`,
      },
    };
  }
}

const WordRoomPage: React.FC<WordRoomPageProps> = async ({
  params: { gameId },
}) => {
  return <WordMainCard roomId={gameId} />;
};

export default WordRoomPage;
