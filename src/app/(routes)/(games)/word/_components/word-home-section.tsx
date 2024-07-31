import Image from 'next/image';

import { WORD_GAME_DESCRIPTION_AR, WORD_GAME_NAME_AR } from '@/config/word';

import WordHomeCreateCard from './word-home-create-card';

interface WordHomeSectionProps {}

const WordHomeSection: React.FC<WordHomeSectionProps> = ({}) => {
  return (
    <div className="grid grid-cols-[1fr_450px] items-center h-screen relative">
      <div className="space-y-8 px-12">
        <h1 className="font-black text-7xl">لعبة {WORD_GAME_NAME_AR}</h1>
        <div className="space-y-2">
          <p className="text-3xl">{WORD_GAME_DESCRIPTION_AR}</p>
          <p className="text-xl">أنشئ غرفة والعب بسهولة مع اصدقائك!</p>
        </div>
      </div>
      <div className="flex items-center justify-end pl-12 h-full bg-black/40">
        <WordHomeCreateCard />
        <div className="absolute w-96 h-96 bottom-14 left-1/2 -translate-x-1/2">
          <Image src="/svg/home-arrow-1.svg" alt="home-arrow-1" fill />
        </div>
      </div>
    </div>
  );
};

export default WordHomeSection;
