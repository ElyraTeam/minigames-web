import Image from 'next/image';
import { MdCrisisAlert } from 'react-icons/md';

interface WordCountdownProps {
  title: React.ReactNode;
  subtitle: string;
  countdown: number;
}

const WordCountdown: React.FC<WordCountdownProps> = ({
  title,
  subtitle,
  countdown,
}) => {
  return (
    <div className="relative h-full flex flex-col">
      <div className="relative px-12 py-20 h-fit">
        <div className="absolute top-12 bg-word-game-600 -translate-x-1/2 left-1/2 p-1 rounded-full">
          <MdCrisisAlert className="text-5xl" />
        </div>
        <div className="bg-white/10 text-center space-y-2 py-10 rounded-2xl">
          <h3 className="font-bold">{title}</h3>
          <p>{subtitle}</p>
        </div>
        <div className="absolute bottom-12 p-2 rounded-full bg-word-game-600 -translate-x-1/2 left-1/2">
          <p className="text-xl bg-white/10 p-2 rounded-full w-8 h-8 flex flex-col items-center justify-center">
            {countdown}
          </p>
        </div>
      </div>
      <div className="absolute w-full h-24 bottom-0">
        <div className="relative h-full">
          <Image
            src="/svg/word-waves.svg"
            alt="word-waves"
            objectFit="cover"
            fill
          />
        </div>
      </div>
    </div>
  );
};

export default WordCountdown;
