'use client';

import { MdRefresh } from 'react-icons/md';

import useGameStore from '@/state/game';
import useRoomStore from '@/state/room';
import IconButton from '@/components/ui/icon-button';

import WordSideCardHeader from '../word-side-card-header';

interface WordCurrentRoundProps {}

const WordCurrentRound: React.FC<WordCurrentRoundProps> = ({}) => {
  const gameState = useGameStore((state) => state.game);
  const roomOptions = useRoomStore((state) => state.options);

  return (
    <WordSideCardHeader className="flex items-center justify-center space-x-3 rtl:space-x-reverse">
      <span>الجولة</span>
      <span>
        <span className="font-light">
          {roomOptions?.options?.rounds || '?'}/
        </span>
        {gameState?.currentRound || '?'}
      </span>
      <IconButton>
        <MdRefresh className="inline text-2xl mb-3" />
      </IconButton>
    </WordSideCardHeader>
  );
};

export default WordCurrentRound;
