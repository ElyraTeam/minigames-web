import WordSideCard from '../word-side-card';
import WordInfoTabList from './word-info-tab-list';
import WordCurrentRound from './word-current-round';
import WordFeedbackContainer from './word-feedback-container';

interface WordRoomInfoContainerProps {}

const WordRoomInfoContainer: React.FC<WordRoomInfoContainerProps> = ({}) => {
  return (
    <WordSideCard className="flex flex-col row-start-2 lg:row-start-auto">
      <WordCurrentRound />
      <WordInfoTabList />
      <WordFeedbackContainer />
    </WordSideCard>
  );
};

export default WordRoomInfoContainer;
