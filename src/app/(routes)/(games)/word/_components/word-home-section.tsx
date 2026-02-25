import Image from 'next/image';
import { useTranslations } from 'next-intl';

import AppearOnTransition from '@/components/ui/appear-on-transition';

import WordHomeCreateCard from './word-home-create-card';

interface WordHomeSectionProps {}

const WordHomeSection: React.FC<WordHomeSectionProps> = ({}) => {
  const t = useTranslations('WordHome');

  return (
    <div
      className="
        relative grid h-screen grid-rows-[1fr_2fr] items-center pt-24
        lg:grid-cols-[1fr_450px] lg:grid-rows-none lg:justify-normal lg:pt-0
      "
    >
      <AppearOnTransition className="slide-in-from-top-20">
        <div
          className="
            space-y-4 px-2 text-center
            sm:px-4
            lg:space-y-8 lg:px-12 lg:text-start
          "
        >
          <h1
            className="
              text-3xl font-black
              xs:text-5xl
              lg:text-7xl
            "
          >
            {t('gameTitle')}
          </h1>
          <div className="space-y-2">
            <p
              className="
                text-sm
                xs:text-lg
                lg:text-3xl
              "
            >
              {t('gameDescription')}
            </p>
            <p
              className="
                text-xs
                xs:text-sm
                lg:text-xl
              "
            >
              {t('playWithFriends')}
            </p>
          </div>
        </div>
      </AppearOnTransition>
      <div
        className="
          flex h-full items-center justify-center rounded-t-3xl bg-black/40 py-8
          lg:justify-end lg:rounded-t-none lg:pr-12
          rtl:pr-0
          rtl:lg:pl-12
        "
      >
        <WordHomeCreateCard />
        <div
          className="
            absolute bottom-28 left-1/2 hidden h-64 w-64 -translate-x-1/2
            lg:block
            xl:bottom-14 xl:h-96 xl:w-96
            2xl:h-120 2xl:w-120
            ltr:transform-[scaleX(-1)]
          "
        >
          <Image src="/svg/home-arrow-1.svg" alt="home-arrow-1" fill />
        </div>
      </div>
    </div>
  );
};

export default WordHomeSection;
