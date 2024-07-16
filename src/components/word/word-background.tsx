import Image from 'next/image';

interface WordBackgroundProps {}

const WordBackground: React.FC<WordBackgroundProps> = ({}) => {
  return (
    <div className="fixed w-full h-full top-0 left-0 -z-10">
      <Image
        src="/svg/wordbackground.svg"
        alt="word-background"
        className="object-cover -z-10"
        fill
      />
      <div className="bg-black w-full h-full opacity-30" />
    </div>
  );
};

export default WordBackground;
