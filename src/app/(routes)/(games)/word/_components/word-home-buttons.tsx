import Link from 'next/link';

import Button from '@/components/ui/button';

import WordCreateGame from './word-create-game';

interface WordHomeButtonsProps {}

const WordHomeButtons: React.FC<WordHomeButtonsProps> = ({}) => {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex flex-col gap-4 w-56">
        <WordCreateGame />
        <Link href="/">
          <Button variant="outline">الواجهة الرئيسية</Button>
        </Link>
      </div>
    </div>
  );
};

export default WordHomeButtons;
