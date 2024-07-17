import { MdRefresh } from 'react-icons/md';

import IconButton from '@/components/ui/icon-button';

import WordSideCard from '../word-side-card';
import WordSideCardHeader from '../word-side-card-header';

interface WordRoomInfoContainerProps {}

const WordRoomInfoContainer: React.FC<WordRoomInfoContainerProps> = ({}) => {
  return (
    <WordSideCard>
      <WordSideCardHeader className="space-x-3 rtl:space-x-reverse">
        <span>الجولة</span>
        <span>12/0</span>
        <IconButton>
          <MdRefresh className="inline text-3xl" />
        </IconButton>
      </WordSideCardHeader>
    </WordSideCard>
  );
};

export default WordRoomInfoContainer;
