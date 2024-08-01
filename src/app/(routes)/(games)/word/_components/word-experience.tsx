import Image from 'next/image';

import WordHomeCard from './word-home-card';

interface WordExperienceProps {}

const WordExperience: React.FC<WordExperienceProps> = ({}) => {
  return (
    <div className="relative h-[100vh]">
      <div className="absolute flex flex-col-reverse lg:flex-row justify-center lg:justify-between lg:pl-[5%] xl:pl-[20%] items-center bottom-0 word-play-background h-full w-full -top-24">
        <div className="relative w-[300px] h-[320px] xs:w-[350px] xs:h-[370px] lg:w-[500px] lg:h-[500px] xl:w-[600px] xl:h-[600px]">
          <Image
            src="/img/word-settings.png"
            alt="word-settings"
            className="object-contain"
            fill
            unoptimized={true}
          />
        </div>
        <WordHomeCard
          title="تحكم فالتجربة"
          description="خصص اللعبة كما تريد عن طريق 
اختيار الحروف التي تريدها وإضافة أو إزالة فئات حسب رغبتك"
        />
      </div>
      <div className="absolute -bottom-28 left-[33%] xl:left-[37%] z-50 hidden lg:block">
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
