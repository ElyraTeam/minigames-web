import { useEffect, useRef } from 'react';
import { useAppSelector } from '../../state/hooks';
import WordContent from './shared/WordContent';
import WordSidebar from './WordSidebar';
import WordVotingCard from './WordVotingCard';

interface WordVotingProps {
  allVotes: AllPlayersVotes;
  localVotes: Votes;
  categoryVoteData: CategoryVoteData;
  onVoteChange: (nickname: string, vote: number) => void;
  disableVotes?: boolean;
  voted: boolean;
  confirmVote: () => void;
  votedCount: number;
}

const WordVoting: React.FC<WordVotingProps> = ({
  localVotes,
  allVotes,
  onVoteChange,
  categoryVoteData,
  disableVotes,
  voted,
  confirmVote,
  votedCount,
}) => {
  const catLength = useAppSelector(
    (state) => state.roomSlice.options?.categories.length
  );
  const playersLength = useAppSelector(
    (state) => state.playersSlice?.players?.length
  );
  const playerNickname = useAppSelector((state) => state.localSlice.nickname);
  const votingCardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (votingCardsRef.current)
      votingCardsRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [votingCardsRef, categoryVoteData]);

  const getTotalVotes = () => {
    const totalVotes: { [votedTo: string]: { [vote: number]: string[] } } = {};
    for (const voter in allVotes) {
      const userVotes = allVotes[voter];
      for (const votedTo in userVotes) {
        const vote = userVotes[votedTo];
        if (!totalVotes[votedTo]) {
          totalVotes[votedTo] = {};
        }
        if (!totalVotes[votedTo][vote]) {
          totalVotes[votedTo][vote] = [];
        }
        totalVotes[votedTo][vote].push(voter);
      }
    }
    return totalVotes;
  };

  return (
    <div>
      <WordContent>
        <div className="grid grid-cols-[auto_1fr] h-full w-full sm:overflow-hidden">
          <div className="chat-section scrollbar-thin overflow-y-scroll">
            <WordSidebar />
          </div>
          <div
            className="pb-8 px-12 scrollbar-thin overflow-y-scroll"
            dir="ltr"
          >
            <div ref={votingCardsRef} />
            <h1
              className="font-semibold text-2xl text-right mb-12 mt-8"
              dir="rtl"
            >
              صوت للاجابة الصحيحة:{' '}
              <span className="mr-2 font-bold">
                {categoryVoteData?.category}
                <span className="mx-4 font-medium">
                  (
                  <span className="font-bold">
                    {`${catLength}/`}
                    <span className="text-secondary">
                      {(categoryVoteData?.categoryIndex ?? 0) + 1}
                    </span>
                  </span>
                  )
                </span>
              </span>
            </h1>
            <div
              className="grid md:grid-cols-2 justify-items-center gap-y-8 sm:grid-cols-1"
              dir="rtl"
            >
              {Object.entries(categoryVoteData?.values || []).map(
                ([nickname, value]) => {
                  const isValueEmpty = value == undefined || value == '';
                  const totalVotes = getTotalVotes();
                  return (
                    <WordVotingCard
                      key={nickname}
                      nickname={nickname}
                      value={value}
                      onVoteChange={onVoteChange}
                      activeVote={isValueEmpty ? 0 : localVotes[nickname]}
                      disableVotes={disableVotes || nickname == playerNickname}
                      locked={isValueEmpty}
                      votes={totalVotes[nickname]}
                    />
                  );
                }
              )}
            </div>
          </div>
        </div>
      </WordContent>
      <div className="flex justify-center align-middle">
        {voted && (
          <p className="align-middle self-center text-2xl font-bold">
            {playersLength ?? 0}/
            <span className="text-secondary">{votedCount}</span>
          </p>
        )}
        {categoryVoteData && !voted && (
          <button
            className="finish-button bg-[#1a8b90] hover:bg-[#12595c] text-white py-2 px-5 rounded-3xl ml-4"
            onClick={confirmVote}
          >
            !انتهيت
          </button>
        )}
      </div>
    </div>
  );
};

export default WordVoting;
