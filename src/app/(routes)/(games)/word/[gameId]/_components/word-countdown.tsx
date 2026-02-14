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
    <div className="relative flex-1 flex flex-col pt-20 overflow-hidden animate-in fade-in duration-500">
      <div className="relative lg:px-12 py-10 px-3 h-fit">
        <div className="absolute top-2 bg-word-game-600 -translate-x-1/2 left-1/2 p-1 rounded-full">
          <MdCrisisAlert className="text-5xl" />
        </div>
        <div className="bg-word-game/40 text-center space-y-2 py-10 px-3 rounded-full">
          <h3 className="font-bold">{title}</h3>
          <p className="text-sm lg:text-base">{subtitle}</p>
        </div>
        <div className="absolute bottom-5 p-1 rounded-full bg-word-game-600 -translate-x-1/2 left-1/2">
          <p className="text-xl bg-word-game/40 p-2 rounded-full w-8 h-8 flex flex-col items-center justify-center">
            {countdown}
          </p>
        </div>
      </div>
      <div className="fixed lg:absolute bottom-14 lg:-bottom-8 inset-x-0 lg:inset-x-auto w-full h-40">
        <div className="relative h-full">
          <Image
            src="/svg/word-waves.svg"
            alt="word-waves"
            className="object-cover"
            priority={true}
            fill
          />
        </div>
      </div>
    </div>
  );
};

export default WordCountdown;
