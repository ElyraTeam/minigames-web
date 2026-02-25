import Image from 'next/image';
import { useTranslations } from 'next-intl';

import AppearOnTransition from '@/components/ui/appear-on-transition';

import WordHomeCard from './word-home-card';

interface WordGetPointsProps {}

const WordGetPoints: React.FC<WordGetPointsProps> = ({}) => {
  const t = useTranslations('WordHome');

  return (
    <div className="relative h-screen">
      <div className="
        word-play-background absolute -top-24 bottom-0 flex h-full w-full
        flex-col-reverse items-center justify-center
        lg:flex-row lg:justify-between lg:pl-[5%]
        xl:pl-[20%]
      ">
        <AppearOnTransition className="slide-in-from-right-20">
          <div className="
            relative h-[320px] w-[300px]
            xs:h-[370px] xs:w-[350px]
            lg:h-[500px] lg:w-[500px]
            xl:h-[600px] xl:w-[600px]
          ">
            <Image
              src="/img/word-votes.png"
              alt="word-settings"
              className="object-contain"
              fill
              unoptimized={true}
            />
          </div>
        </AppearOnTransition>
        <AppearOnTransition className="slide-in-from-left-20">
          <WordHomeCard
            title={t('getPoints.title')}
            description={t('getPoints.description')}
          />
        </AppearOnTransition>
      </div>
    </div>
  );
};

export default WordGetPoints;
