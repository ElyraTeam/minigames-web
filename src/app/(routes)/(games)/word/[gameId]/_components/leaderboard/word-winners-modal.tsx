import { FaMedal } from 'react-icons/fa';

import Modal from '@/components/modals/modal';

import WordWinner from './word-winner';

interface WordWinnersModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  winners: Player[];
}

const WordWinnersModal: React.FC<WordWinnersModalProps> = ({
  isOpen,
  onOpenChange,
  winners,
}) => {
  const getRankByIndex = (index: number) => {
    if (index === 1) return 1;
    if (index === 0) return 3;
    if (index === 2) return 2;
    return index;
  };

  const renderWinner = (index: number, plr?: Player | null) => {
    return (
      <WordWinner
        key={`word-winner-${index}`}
        name={plr?.nickname ?? '-----'}
        score={plr?.totalScore ?? 0}
        rank={getRankByIndex(index)}
        height={((plr?.totalScore ?? 0) / firstPlr.totalScore) * 100}
      />
    );
  };

  const firstPlr = winners[0];
  const secondPlr = winners[1];
  const thirdPlr = winners[2];

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      className="
        w-[90%] overflow-hidden border-4 border-white p-0
        lg:w-[500px]
      "
      closeClassName="text-white"
    >
      <div className="
        flex flex-col items-center gap-3 rounded-b-2xl bg-word-game-800 p-8
        text-white
      ">
        <FaMedal className="text-4xl" />
        <h4 className="font-bold">انتهت اللعبة!</h4>
      </div>
      <div className="flex h-64 gap-2 px-8 py-4">
        {[thirdPlr, firstPlr, secondPlr].map((plr, index) =>
          renderWinner(index, plr)
        )}
      </div>
    </Modal>
  );
};

export default WordWinnersModal;
