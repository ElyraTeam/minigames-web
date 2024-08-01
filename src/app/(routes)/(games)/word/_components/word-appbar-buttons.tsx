import Link from 'next/link';
import { IoPerson } from 'react-icons/io5';

import WordButton from '@/components/word/word-button';

import WordNickname from './word-nickname';
import WordHomeContact from './word-home-contact';

interface WordAppbarButtonsProps {}

const WordAppbarButtons: React.FC<WordAppbarButtonsProps> = ({}) => {
  return (
    <>
      <Link href="/getstarted" className="w-full">
        <WordButton
          variant="solid"
          className="w-full py-2 bg-word-game-800 hover:bg-word-game-800/80 border-none space-x-1 rtl:space-x-reverse flex items-center justify-center shadow-[inset_0_0_10px_rgba(0,0,0,0.5)]"
        >
          <IoPerson className="inline text-lg" />
          <WordNickname />
        </WordButton>
      </Link>
      <WordHomeContact />
    </>
  );
};

export default WordAppbarButtons;
