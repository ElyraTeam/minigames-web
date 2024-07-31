import Image from 'next/image';

import WordHomeCard from './word-home-card';

interface WordExperienceProps {}

const WordExperience: React.FC<WordExperienceProps> = ({}) => {
  return (
    <div className="relative h-[100vh]">
      <div className="absolute flex justify-between pl-[20%] items-center bottom-0 word-play-background h-full w-full -top-24">
        <Image
          src="/img/word-settings.png"
          alt="word-settings"
          width={600}
          height={600}
          unoptimized={true}
        />
        <WordHomeCard
          title="تحكم فالتجربة"
          description="خصص اللعبة كما تريد عن طريق 
اختيار الحروف التي تريدها وإضافة أو إزالة فئات حسب رغبتك"
        />
      </div>
      <div className="absolute -bottom-28 left-[37%] z-50">
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
