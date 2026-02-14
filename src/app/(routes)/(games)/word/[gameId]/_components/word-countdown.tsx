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
    <div className="
      relative flex flex-1 flex-col overflow-hidden pt-20 duration-500
      animate-in fade-in
    ">
      <div className="
        relative h-fit px-3 py-10
        lg:px-12
      ">
        <div className="
          absolute top-2 left-1/2 -translate-x-1/2 rounded-full bg-word-game-600
          p-1
        ">
          <MdCrisisAlert className="text-5xl" />
        </div>
        <div className="
          space-y-2 rounded-full bg-word-game/40 px-3 py-10 text-center
        ">
          <h3 className="font-bold">{title}</h3>
          <p className="
            text-sm
            lg:text-base
          ">{subtitle}</p>
        </div>
        <div className="
          absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full
          bg-word-game-600 p-1
        ">
          <p className="
            flex h-8 w-8 flex-col items-center justify-center rounded-full
            bg-word-game/40 p-2 text-xl
          ">
            {countdown}
          </p>
        </div>
      </div>
      <div className="
        fixed inset-x-0 bottom-14 h-40 w-full
        lg:absolute lg:inset-x-auto lg:-bottom-8
      ">
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
