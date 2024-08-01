import Link from 'next/link';

import { WORD_GAME_NAME_AR } from '@/config/word';
import WordLogo from '@/components/word/word-logo';
import ElyraLogo from '@/components/ui/elyra-logo';

import WordAppbarMobile from './word-appbar-mobile';
import WordAppbarButtons from './word-appbar-buttons';
import WordAppbarBackground from './word-appbar-background';

interface WordAppbarProps {}

const WordAppbar: React.FC<WordAppbarProps> = ({}) => {
  return (
    <>
      <WordAppbarBackground>
        <div className="flex items-center gap-3 lg:gap-5">
          <ElyraLogo size={60} />
          <div className="border-r-2 border-white/10 h-8 " />
          <div className="flex items-center gap-3">
            <Link href="/word">
              <WordLogo size={65} />
            </Link>
            <p className="font-bold text-lg lg:text-xl">{WORD_GAME_NAME_AR}</p>
          </div>
        </div>
        <div className="w-72 items-center gap-5 hidden sm:flex">
          <WordAppbarButtons />
        </div>
        <WordAppbarMobile />
      </WordAppbarBackground>
    </>
  );
};

export default WordAppbar;
