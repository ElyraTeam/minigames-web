'use client';

import WordCard from './word-card';
import useCurrentGame from '@/hooks/use-current-game';

interface WordMainCardProps {
  roomId: string;
}

const WordMainCard: React.FC<WordMainCardProps> = ({ roomId }) => {
  useCurrentGame(roomId);

  return (
    <WordCard className="bg-word-game text-center">Game Id: {roomId}</WordCard>
  );
};

export default WordMainCard;
