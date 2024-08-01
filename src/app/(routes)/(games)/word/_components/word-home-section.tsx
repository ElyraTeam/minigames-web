import Image from 'next/image';

import { WORD_GAME_DESCRIPTION_AR, WORD_GAME_NAME_AR } from '@/config/word';

import WordHomeCreateCard from './word-home-create-card';

interface WordHomeSectionProps {}

const WordHomeSection: React.FC<WordHomeSectionProps> = ({}) => {
  return (
    <div className="grid grid-rows-[1fr_2fr] lg:grid-rows-none lg:grid-cols-[1fr_450px] pt-24 lg:pt-0 lg:justify-normal items-center h-screen relative">
      <div className="space-y-4 lg:space-y-8 px-2 sm:px-4 lg:px-12 text-center lg:text-start">
        <h1 className="font-black text-3xl xs:text-5xl lg:text-7xl">
          لعبة {WORD_GAME_NAME_AR}
        </h1>
        <div className="space-y-2">
          <p className="text-sm xs:text-lg lg:text-3xl">
            {WORD_GAME_DESCRIPTION_AR}
          </p>
          <p className="text-xs xs:text-sm lg:text-xl">
            أنشئ غرفة والعب بسهولة مع اصدقائك!
          </p>
        </div>
      </div>
      <div className="flex items-center justify-center py-8 rounded-t-3xl lg:rounded-t-none lg:justify-end lg:pl-12 h-full bg-black/40">
        <WordHomeCreateCard />
        <div className="absolute w-64 h-64 xl:w-96 xl:h-96 bottom-28 xl:bottom-14 left-1/2 -translate-x-1/2 hidden lg:block">
          <Image src="/svg/home-arrow-1.svg" alt="home-arrow-1" fill />
        </div>
      </div>
    </div>
  );
};

export default WordHomeSection;
