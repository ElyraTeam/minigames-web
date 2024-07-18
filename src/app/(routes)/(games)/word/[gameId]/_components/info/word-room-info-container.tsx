import WordSideCard from '../word-side-card';
import WordInfoTabList from './word-info-tab-list';
import WordCurrentRound from './word-current-round';

interface WordRoomInfoContainerProps {}

const WordRoomInfoContainer: React.FC<WordRoomInfoContainerProps> = ({}) => {
  return (
    <WordSideCard className="flex flex-col">
      <WordCurrentRound />
      <WordInfoTabList />
    </WordSideCard>
  );
};

export default WordRoomInfoContainer;
