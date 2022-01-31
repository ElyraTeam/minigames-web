import { useAppSelector } from "../../state/hooks";
import WordChat from "./WordChat";
import WordVotingCard from "./WordVotingCard";

interface WordVotingProps {
  votes: Votes;
  categoryVoteData: CategoryVoteData;
  onVoteChange: (nickname: string, vote: number) => void;
}

const WordVoting: React.FC<WordVotingProps> = ({
  votes,
  onVoteChange,
  categoryVoteData,
}) => {
  const playerNickname = useAppSelector((state) => state.localSlice.nickname);
  return (
    <div className="grid grid-cols-[auto_1fr] h-full w-full sm:overflow-hidden">
      <div className="chat-section">
        <WordChat />
      </div>
      <div className="py-8 px-12 scrollbar-thin overflow-y-scroll" dir="ltr">
        <h1 className="font-semibold text-2xl text-right mb-12" dir="rtl">
          صوت للاجابة الصحيحة:{" "}
          <span className="mr-2 font-bold">{categoryVoteData.category}</span>
        </h1>
        <div
          className="grid md:grid-cols-2 justify-items-center gap-y-8 sm:grid-cols-1"
          dir="rtl"
        >
          {Object.entries(categoryVoteData.values).map(
            ([nickname, value]) =>
              nickname != playerNickname && (
                <WordVotingCard
                  key={nickname}
                  nickname={nickname}
                  value={value}
                  onVoteChange={onVoteChange}
                  activeVote={votes[nickname]}
                />
              )
          )}
        </div>
      </div>
    </div>
  );
};

export default WordVoting;
