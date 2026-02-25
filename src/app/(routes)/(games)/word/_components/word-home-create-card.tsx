import { useTranslations } from 'next-intl';

import AppearOnTransition from '@/components/ui/appear-on-transition';

import WordCreateGame from './word-create-game';
import WordPublicRoomsButton from './word-public-rooms-button';

interface WordHomeCreateCardProps {}

const WordHomeCreateCard: React.FC<WordHomeCreateCardProps> = ({}) => {
  const t = useTranslations('WordHome');

  return (
    <AppearOnTransition className="slide-in-from-top-20">
      <div
        className="
          flex w-80 flex-col items-center justify-center gap-16 rounded-3xl
          border-2 border-word-game px-12 py-16
          lg:gap-20 lg:py-20
        "
      >
        <h2 className="font-bold">{t('startPlaying')}</h2>
        <div className="space-y-3">
          <WordCreateGame />
          <WordPublicRoomsButton />
        </div>
      </div>
    </AppearOnTransition>
  );
};

export default WordHomeCreateCard;
