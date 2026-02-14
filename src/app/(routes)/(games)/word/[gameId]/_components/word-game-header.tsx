import Link from 'next/link';

import WordLogo from '@/components/word/word-logo';

import WordGameIcons from './word-game-icons';

interface WordGameHeaderProps {}

const WordGameHeader: React.FC<WordGameHeaderProps> = ({}) => {
  return (
    <div className="flex justify-center items-center gap-3 py-5 relative">
      <WordGameIcons theme="light" />
      <div className="absolute right-0 hidden lg:block">
        <WordLogo />
      </div>
    </div>
  );
};

export default WordGameHeader;
