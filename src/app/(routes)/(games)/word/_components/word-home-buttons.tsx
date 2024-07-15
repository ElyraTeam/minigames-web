import Link from 'next/link';

import Button from '@/components/ui/button';

interface WordHomeButtonsProps {}

const WordHomeButtons: React.FC<WordHomeButtonsProps> = ({}) => {
  return (
    <div className="text-center flex flex-col sm:flex-row gap-6 justify-center">
      <Link href="/word/room/create">
        <Button>ابدأ لعبة جديدة</Button>
      </Link>

      <Link href="/">
        <Button variant="outline">الواجهة الرئيسية</Button>
      </Link>
    </div>
  );
};

export default WordHomeButtons;
