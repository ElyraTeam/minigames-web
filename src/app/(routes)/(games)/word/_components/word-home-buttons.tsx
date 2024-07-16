import Link from 'next/link';

import Button from '@/components/ui/button';
import Button3D from '@/components/ui/button-3d';

interface WordHomeButtonsProps {}

const WordHomeButtons: React.FC<WordHomeButtonsProps> = ({}) => {
  return (
    <div className="text-center flex flex-col justify-center items-center">
      <div className="flex flex-col gap-4 w-56">
        <Link href="/word/create">
          <Button3D>ابدأ اللعبة</Button3D>
        </Link>
        <Link href="/">
          <Button variant="outline">الواجهة الرئيسية</Button>
        </Link>
      </div>
    </div>
  );
};

export default WordHomeButtons;
