import Image from 'next/image';

import WordHomeCard from './word-home-card';

interface WordGetPointsProps {}

const WordGetPoints: React.FC<WordGetPointsProps> = ({}) => {
  return (
    <div className="relative h-[100vh]">
      <div className="absolute flex flex-col-reverse lg:flex-row justify-center lg:justify-between lg:pl-[5%] xl:pl-[20%] items-center bottom-0 word-play-background h-full w-full -top-24">
        <div className="relative w-[300px] h-[320px] xs:w-[350px] xs:h-[370px] lg:w-[500px] lg:h-[500px] xl:w-[600px] xl:h-[600px]">
          <Image
            src="/img/word-votes.png"
            alt="word-settings"
            className="object-contain"
            fill
            unoptimized={true}
          />
        </div>
        <WordHomeCard
          title="جمع النقاط"
          description="صوت أنت واصدقائك للكلمات الصحيحة وكن أعلي من يملك نقاطا عند نهاية جميع الجولات"
        />
      </div>
    </div>
  );
};

export default WordGetPoints;
