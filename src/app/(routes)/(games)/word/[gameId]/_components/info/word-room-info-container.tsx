import WordSideCard from '../word-side-card';
import WordInfoTabList from './word-info-tab-list';
import WordCurrentRound from './word-current-round';
import WordFeedbackContainer from './word-feedback-container';

interface WordRoomInfoContainerProps {}

const WordRoomInfoContainer: React.FC<WordRoomInfoContainerProps> = ({}) => {
  return (
    <WordSideCard className="
      row-start-2 flex min-h-0 flex-col
      lg:row-start-auto
    ">
      <WordCurrentRound />
      <WordInfoTabList />
      <WordFeedbackContainer />
    </WordSideCard>
  );
};

export default WordRoomInfoContainer;
