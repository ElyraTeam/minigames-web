import { useEffect, useRef } from "react";
import { useAppSelector } from "../../state/hooks";
import WordChat from "./WordChat";
import WordVotingCard from "./WordVotingCard";

interface WordVotingProps {
  votes: Votes;
  categoryVoteData: CategoryVoteData;
  onVoteChange: (nickname: string, vote: number) => void;
  disableVotes?: boolean;
}

const WordVoting: React.FC<WordVotingProps> = ({
  votes,
  onVoteChange,
  categoryVoteData,
  disableVotes,
}) => {
  const playerNickname = useAppSelector((state) => state.localSlice.nickname);
  const votingCardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (votingCardsRef.current)
      votingCardsRef.current?.scrollTo({ behavior: "smooth", top: 0 });
  }, [votingCardsRef]);

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
          ref={votingCardsRef}
        >
          {Object.entries(categoryVoteData.values).map(([nickname, value]) => {
            const isValueEmpty = value == undefined || value == "";
            return (
              <WordVotingCard
                key={nickname}
                nickname={nickname}
                value={value}
                onVoteChange={onVoteChange}
                activeVote={isValueEmpty ? 0 : votes[nickname]}
                disableVotes={disableVotes || nickname == playerNickname}
                locked={isValueEmpty}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default WordVoting;
