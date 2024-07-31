import Image from 'next/image';

interface WordPlayHeaderProps {}

const WordPlayHeader: React.FC<WordPlayHeaderProps> = ({}) => {
  return (
    <div className="relative h-[60vh] flex flex-col items-center justify-center shadow-[rgba(0,0,0,0.8)_0px_5px_45px]">
      <div className="absolute w-full top-0 h-[260vh] [backdrop-filter:blur(20px)] bg-word-home/50" />
      <div className="flex flex-col items-center gap-3 z-10">
        <Image
          src="/svg/help-icon.svg"
          width={100}
          height={100}
          alt="help-icon"
        />
        <p className="text-4xl font-bold">كيفية اللعب</p>
      </div>
      <div className="absolute -bottom-32 left-[35%] z-20">
        <Image
          src="/svg/home-arrow-2.svg"
          alt="home-arrow-2"
          width={200}
          height={200}
        />
      </div>
    </div>
  );
};

export default WordPlayHeader;
