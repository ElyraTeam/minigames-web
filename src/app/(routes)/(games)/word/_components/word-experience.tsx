import Image from 'next/image';
import { useTranslations } from 'next-intl';

import AppearOnTransition from '@/components/ui/appear-on-transition';

import WordHomeCard from './word-home-card';

interface WordExperienceProps {}

const WordExperience: React.FC<WordExperienceProps> = ({}) => {
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
              src="/img/word-settings.png"
              alt="word-settings"
              className="object-contain"
              fill
              unoptimized={true}
            />
          </div>
        </AppearOnTransition>
        <AppearOnTransition className="slide-in-from-left-20">
          <WordHomeCard
            title={t('experience.title')}
            description={t('experience.description')}
          />
        </AppearOnTransition>
      </div>
      <div className="
        absolute -bottom-28 left-[33%] z-50 hidden
        lg:block
        xl:left-[37%]
      ">
        <Image
          src="/svg/home-arrow-3.svg"
          alt="home-arrow-3"
          width={350}
          height={350}
        />
      </div>
    </div>
  );
};

export default WordExperience;
