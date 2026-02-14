import Link from 'next/link';

import { WORD_GAME_NAME_AR } from '@/config/word';
import WordLogo from '@/components/word/word-logo';
import ElyraLogo from '@/components/ui/elyra-logo';
import AuthorModal from '@/components/modals/author-modal';

import WordAppbarMobile from './word-appbar-mobile';
import WordAppbarButtons from './word-appbar-buttons';
import WordAppbarBackground from './word-appbar-background';

interface WordAppbarProps {}

const WordAppbar: React.FC<WordAppbarProps> = ({}) => {
  return (
    <>
      <WordAppbarBackground>
        <div className="
          flex items-center gap-3
          lg:gap-5
        ">
          <AuthorModal>
            <ElyraLogo size={60} />
          </AuthorModal>
          <div className="h-8 border-r-2 border-white/10" />
          <div className="flex items-center gap-3">
            <Link href="/">
              <WordLogo size={65} />
            </Link>
            <p className="
              text-lg font-bold
              lg:text-xl
            ">{WORD_GAME_NAME_AR}</p>
          </div>
        </div>
        <div className="
          hidden w-80 items-center gap-5
          sm:flex
        ">
          <WordAppbarButtons />
        </div>
        <WordAppbarMobile />
      </WordAppbarBackground>
    </>
  );
};

export default WordAppbar;
