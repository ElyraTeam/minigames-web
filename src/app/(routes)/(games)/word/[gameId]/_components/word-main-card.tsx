'use client';

import useCurrentGame from '@/hooks/use-current-game';

import WordCard from './word-card';
import WordGameHeader from './word-game-header';
import WordGameContent from './word-game-content';
import WordReadyButton from './lobby/word-ready-button';
import WordGameSettings from './lobby/word-game-settings';

interface WordMainCardProps {
  roomId: string;
}

const WordMainCard: React.FC<WordMainCardProps> = ({ roomId }) => {
  useCurrentGame(roomId);

  return (
    <WordCard className="flex flex-col bg-word-game py-3 px-6 gap-3 overflow-y-auto scrollbar-thin">
      <WordGameHeader />
      <WordGameContent>
        <WordGameSettings />
      </WordGameContent>
      <WordReadyButton />
    </WordCard>
  );
};

export default WordMainCard;
