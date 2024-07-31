import Link from 'next/link';
import { IoPerson } from 'react-icons/io5';

import { WORD_GAME_NAME_AR } from '@/config/word';
import WordLogo from '@/components/word/word-logo';
import ElyraLogo from '@/components/ui/elyra-logo';
import WordButton from '@/components/word/word-button';

import WordNickname from './word-nickname';
import WordHomeContact from './word-home-contact';
import WordAppbarBackground from './word-appbar-background';

interface WordAppbarProps {}

const WordAppbar: React.FC<WordAppbarProps> = ({}) => {
  return (
    <>
      <WordAppbarBackground>
        <div className="flex items-center gap-5">
          <ElyraLogo size={60} />
          <div className="border-r-2 border-white/10 h-8 " />
          <div className="flex items-center gap-3">
            <Link href="/word">
              <WordLogo size={65} />
            </Link>
            <p className="font-bold text-xl">{WORD_GAME_NAME_AR}</p>
          </div>
        </div>
        <div className="flex  items-center gap-5">
          <Link href="/getstarted">
            <WordButton
              variant="solid"
              className="w-28 py-2 bg-word-game-800 hover:bg-word-game-800/80 border-none space-x-1 rtl:space-x-reverse flex items-center justify-center shadow-[inset_0_0_10px_rgba(0,0,0,0.5)]"
            >
              <IoPerson className="inline text-lg" />
              <WordNickname />
            </WordButton>
          </Link>
          <WordHomeContact />
        </div>
      </WordAppbarBackground>
    </>
  );
};

export default WordAppbar;
