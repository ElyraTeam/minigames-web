import Image from 'next/image';

import WordHomeCard from './word-home-card';

interface WordCompetitiveProps {}

const WordCompetitive: React.FC<WordCompetitiveProps> = ({}) => {
  return (
    <div className="relative h-[100vh]">
      <div className="absolute items-center bottom-0 word-play-background word-play-revert h-full w-full -top-24">
        <div className="flex items-center w-full h-full scale-x-[-1] justify-between pr-[20%]">
          <WordHomeCard
            title="كن اسرع"
            description="تسابق مع باقي اللاعبين واملأ جميع الفئات تنتهي مرحلة الكتابة مع انتهاء اول لاعب"
          />
          <Image
            src="/img/word-game.png"
            alt="word-settings"
            width={600}
            height={600}
            unoptimized={true}
          />
        </div>
      </div>
    </div>
  );
};

export default WordCompetitive;
