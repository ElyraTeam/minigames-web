import WordChat from './WordChat';
import WordVotingCard from './WordVotingCard';

interface WordVotingProps {
  votes: Map<string, number>;
  categoryVoteData: CategoryVoteData;
  onVoteChange: (nickname: string, vote: number) => void;
}

const WordVoting: React.FC<WordVotingProps> = ({
  votes,
  onVoteChange,
  categoryVoteData,
}) => {
  return (
    <div className="grid grid-cols-[auto_1fr] h-full w-full sm:overflow-hidden">
      <div className="chat-section">
        <WordChat />
      </div>
      <div className="py-8 px-12 scrollbar-thin overflow-y-scroll" dir="ltr">
        <h1 className="font-semibold text-2xl text-right mb-12" dir="rtl">
          صوت للاجابة الصحيحة:{' '}
          <span className="mr-2 font-bold">{categoryVoteData.category}</span>
        </h1>
        <div
          className="grid md:grid-cols-2 justify-items-center gap-y-8 sm:grid-cols-1"
          dir="rtl"
        >
          {Array.from(categoryVoteData.values).map(([nickname, value]) => (
            <WordVotingCard
              nickname={nickname}
              value={value}
              onVoteChange={onVoteChange}
              activeVote={votes.get(nickname)! ?? 5}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default WordVoting;
