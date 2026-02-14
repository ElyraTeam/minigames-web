import Image from 'next/image';

import AppearOnTransition from '@/components/ui/appear-on-transition';

interface WordPlayHeaderProps {}

const WordPlayHeader: React.FC<WordPlayHeaderProps> = ({}) => {
  return (
    <div className="
      relative flex h-[60vh] flex-col items-center justify-center
      shadow-[rgba(0,0,0,0.8)_0px_5px_45px]
    ">
      <div className="
        absolute top-0 h-[360vh] w-full bg-word-home/50
        [backdrop-filter:blur(20px)]
      " />
      <AppearOnTransition className="z-10 slide-in-from-top-20">
        <div className="z-10 flex flex-col items-center gap-6">
          <Image
            src="/svg/help-icon.svg"
            width={100}
            height={100}
            alt="help-icon"
          />
          <p className="
            text-2xl font-bold
            xs:text-3xl
            lg:text-4xl
          ">
            كيفية اللعب
          </p>
        </div>
      </AppearOnTransition>
      <div className="
        absolute -bottom-32 left-[27%] z-20 hidden
        lg:block
        xl:left-[35%]
      ">
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
