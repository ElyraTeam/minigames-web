import Image from 'next/image';

import AppearOnTransition from '@/components/ui/appear-on-transition';
import { WORD_GAME_DESCRIPTION_AR, WORD_GAME_NAME_AR } from '@/config/word';

import WordHomeCreateCard from './word-home-create-card';

interface WordHomeSectionProps {}

const WordHomeSection: React.FC<WordHomeSectionProps> = ({}) => {
  return (
    <div className="
      relative grid h-screen grid-rows-[1fr_2fr] items-center pt-24
      lg:grid-cols-[1fr_450px] lg:grid-rows-none lg:justify-normal lg:pt-0
    ">
      <AppearOnTransition className="slide-in-from-top-20">
        <div className="
          space-y-4 px-2 text-center
          sm:px-4
          lg:space-y-8 lg:px-12 lg:text-start
        ">
          <h1 className="
            text-3xl font-black
            xs:text-5xl
            lg:text-7xl
          ">
            لعبة {WORD_GAME_NAME_AR}
          </h1>
          <div className="space-y-2">
            <p className="
              text-sm
              xs:text-lg
              lg:text-3xl
            ">
              {WORD_GAME_DESCRIPTION_AR}
            </p>
            <p className="
              text-xs
              xs:text-sm
              lg:text-xl
            ">
              أنشئ غرفة والعب بسهولة مع اصدقائك!
            </p>
          </div>
        </div>
      </AppearOnTransition>
      <div className="
        flex h-full items-center justify-center rounded-t-3xl bg-black/40 py-8
        lg:justify-end lg:rounded-t-none lg:pl-12
      ">
        <WordHomeCreateCard />
        <div className="
          absolute bottom-28 left-1/2 hidden h-64 w-64 -translate-x-1/2
          lg:block
          xl:bottom-14 xl:h-96 xl:w-96
          2xl:h-120 2xl:w-120
        ">
          <Image src="/svg/home-arrow-1.svg" alt="home-arrow-1" fill />
        </div>
      </div>
    </div>
  );
};

export default WordHomeSection;
