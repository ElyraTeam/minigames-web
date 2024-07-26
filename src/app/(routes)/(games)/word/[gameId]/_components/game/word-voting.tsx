import WordVotingCards from './word-voting-cards';
import WordVotingHeader from './word-voting-header';

interface WordVotingProps {}

const WordVoting: React.FC<WordVotingProps> = ({}) => {
  return (
    <>
      <WordVotingHeader />
      <WordVotingCards />
    </>
  );
};

export default WordVoting;
