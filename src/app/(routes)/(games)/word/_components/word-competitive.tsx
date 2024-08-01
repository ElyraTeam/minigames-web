import Image from 'next/image';

import AppearOnTransition from '@/components/ui/appear-on-transition';

import WordHomeCard from './word-home-card';

interface WordCompetitiveProps {}

const WordCompetitive: React.FC<WordCompetitiveProps> = ({}) => {
  return (
    <div className="relative h-[100vh]">
      <div className="absolute items-center bottom-0 word-play-background word-play-revert h-full w-full -top-24">
        <div className="flex flex-col lg:flex-row items-center w-full h-full scale-x-[-1] justify-center lg:justify-between lg:pr-[5%] xl:pr-[20%]">
          <AppearOnTransition className="slide-in-from-right-20">
            <WordHomeCard
              title="كن اسرع"
              description="تسابق مع باقي اللاعبين واملأ جميع الفئات تنتهي مرحلة الكتابة مع انتهاء اول لاعب"
            />
          </AppearOnTransition>
          <AppearOnTransition className="slide-in-from-left-20">
            <div className="relative w-[350px] h-[280px] xs:w-[350px] xs:h-[330px] lg:w-[600px] lg:h-[600px]">
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
      <div className="absolute -bottom-[134px] left-[33%] xl:left-[37%] z-50 hidden lg:block">
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
