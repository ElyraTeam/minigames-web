import Link from 'next/link';

import WordButton from '@/components/word/word-button';

import WordCreateGame from './word-create-game';

interface WordHomeButtonsProps {}

const WordHomeButtons: React.FC<WordHomeButtonsProps> = ({}) => {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex flex-col gap-4 w-56">
        <WordCreateGame />
        <Link href="/">
          <WordButton variant="outline">الواجهة الرئيسية</WordButton>
        </Link>
      </div>
    </div>
  );
};

export default WordHomeButtons;
