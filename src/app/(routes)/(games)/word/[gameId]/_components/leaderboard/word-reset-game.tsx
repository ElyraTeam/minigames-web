import { useTranslations } from 'next-intl';

import localPlayer from '@/api/socket';
import useOwner from '@/hooks/use-owner';

import WordGameButton from '../word-game-button';

interface WordResetGameProps {}

const WordResetGame: React.FC<WordResetGameProps> = ({}) => {
  const isOwner = useOwner();
  const t = useTranslations('WordGame');

  const handleResetGame = () => {
    if (!isOwner) return;
    localPlayer.resetGame();
  };

  return (
    <WordGameButton onClick={handleResetGame} disabled={!isOwner}>
      {isOwner ? t('resetGameButton') : t('waitingForOwner')}
    </WordGameButton>
  );
};

export default WordResetGame;
