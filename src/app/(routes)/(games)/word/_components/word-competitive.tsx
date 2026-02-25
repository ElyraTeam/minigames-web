import Image from 'next/image';
import { useTranslations } from 'next-intl';

import AppearOnTransition from '@/components/ui/appear-on-transition';

import WordHomeCard from './word-home-card';

interface WordCompetitiveProps {}

const WordCompetitive: React.FC<WordCompetitiveProps> = ({}) => {
  const t = useTranslations('WordHome');

  return (
    <div className="relative h-screen">
      <div className="
        word-play-background word-play-revert absolute -top-24 bottom-0 h-full
        w-full items-center
      ">
        <div className="
          flex h-full w-full scale-x-[-1] flex-col items-center justify-center
          lg:flex-row lg:justify-between lg:pr-[5%]
          xl:pr-[20%]
        ">
          <AppearOnTransition className="slide-in-from-right-20">
            <WordHomeCard
              title={t('competitive.title')}
              description={t('competitive.description')}
            />
          </AppearOnTransition>
          <AppearOnTransition className="slide-in-from-left-20">
            <div className="
              relative h-[280px] w-[350px]
              xs:h-[330px] xs:w-[350px]
              lg:h-[600px] lg:w-[600px]
            ">
              <Image
                src="/img/word-game.png"
                alt="word-game"
                className="object-contain"
                fill
                unoptimized={true}
              />
            </div>
          </AppearOnTransition>
        </div>
      </div>
      <div className="
        absolute -bottom-[134px] left-[33%] z-50 hidden
        lg:block
        xl:left-[37%]
      ">
        <Image
          src="/svg/home-arrow-4.svg"
          alt="home-arrow-4"
          width={350}
          height={350}
        />
      </div>
    </div>
  );
};

export default WordCompetitive;
