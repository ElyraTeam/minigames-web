import { FaMedal } from 'react-icons/fa';
import { useEffect, useMemo } from 'react';

import { uid } from '@/lib/utils';
import { WordSound } from '@/config/word';
import useLocalStore from '@/state/local';
import usePlayersStore from '@/state/players';
import Modal from '@/components/modals/modal';
import useWordSound from '@/hooks/use-word-sound';

import WordWinner from './word-winner';

interface WordWinnersModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const WordWinnersModal: React.FC<WordWinnersModalProps> = ({
  isOpen,
  onOpenChange,
}) => {
  const [playWinnerSound] = useWordSound(WordSound.AFTER_WIN);
  const [playLoseSound] = useWordSound(WordSound.AFTER_LOSE);
  const currentPlayerId = useLocalStore((state) => state.playerId);
  const gamePlayers = usePlayersStore((state) => state.players?.players);

  const sortedPlayers = useMemo(() => {
    return [...(gamePlayers || [])].sort((a, b) => b.totalScore - a.totalScore);
  }, [gamePlayers]);

  const generatePlayer = () => {
    const id = uid();
    return { id, nickname: '-----', totalScore: 0 };
  };

  const getRankByIndex = (index: number) => {
    if (index === 1) return 1;
    if (index === 0) return 3;
    if (index === 2) return 2;
    return index;
  };

  const firstPlr = sortedPlayers[0] ?? generatePlayer();
  const secondPlr = sortedPlayers[1] ?? generatePlayer();
  const thirdPlr = sortedPlayers[2] ?? generatePlayer();

  useEffect(() => {
    if (!isOpen) return;
    if (currentPlayerId && firstPlr) {
      if (currentPlayerId === firstPlr.id) {
        playWinnerSound();
      } else {
        playLoseSound();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPlayerId, firstPlr, isOpen]);

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      className="p-0 overflow-hidden w-[90%] lg:w-[500px] border-4 border-white"
      closeClassName="text-white"
    >
      <div className="flex flex-col items-center bg-word-game-800 rounded-b-2xl gap-3 p-8 text-white">
        <FaMedal className="text-4xl" />
        <h4 className="font-bold">انتهت اللعبة!</h4>
      </div>
      <div className="flex gap-2 px-8 py-4 h-64">
        {[thirdPlr, firstPlr, secondPlr].map((plr, index) => (
          <WordWinner
            key={`word-winner-${plr.id}`}
            name={plr.nickname}
            score={plr.totalScore}
            rank={getRankByIndex(index)}
            height={(plr.totalScore / firstPlr.totalScore) * 100}
          />
        ))}
      </div>
    </Modal>
  );
};

export default WordWinnersModal;
