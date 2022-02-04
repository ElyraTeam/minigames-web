import classNames from "classnames";
import { useAppSelector } from "../../state/hooks";
import Card from "../shared/Card";

interface WordVotingCardProps {
  nickname: string;
  value: string;
  onVoteChange: (nickname: string, vote: number) => void;
  activeVote?: number;
  votes: { [vote: number]: string[] };
  disableVotes?: boolean;
  locked?: boolean;
}

interface VotingCircleProps {
  vote: number;
  votes: string[];
  onClick?: () => void;
  active?: boolean;
  canChangeVote?: boolean;
  locked?: boolean;
}

const VotingCircle: React.FC<VotingCircleProps> = ({
  vote,
  votes,
  onClick,
  active,
  canChangeVote,
  locked,
}) => {
  return (
    <div
      className={classNames(
        "relative group text-[0.92rem] font-semibold cursor-pointer rounded-full w-7 h-7 bg-[#eee] bg-opacity-20 flex align-middle justify-center items-center font-[arial] hover:bg-opacity-40 ",
        {
          "bg-secondary bg-opacity-100 border-2": active,
          "bg-secondary bg-opacity-60 border-2": active && locked,
          "hover:bg-opacity-20 cursor-default": !canChangeVote,
        }
      )}
      onClick={canChangeVote ? onClick : undefined}
    >
      {votes.length > 0 && (
        <div
          className={classNames(
            "absolute scale-0 hover:scale-100 delay-75 group-hover:scale-100 top-8 bg-secondary py-2 px-3 rounded-md transition-[transform] text-[#eee] font-[cairo] z-50 w-auto min-w-min",
            { "grid grid-cols-[1fr_1fr] gap-4": votes.length >= 2 }
          )}
        >
          {votes.map((nickname: string, i) => (
            <span key={nickname} className="whitespace-nowrap">
              {nickname}
            </span>
          ))}
        </div>
      )}
      <span
        className={classNames("text-center", {
          "cursor-pointer": canChangeVote,
        })}
      >
        {vote}
      </span>
    </div>
  );
};

const WordVotingCard: React.FC<WordVotingCardProps> = ({
  nickname,
  value,
  activeVote,
  onVoteChange,
  disableVotes,
  locked,
  votes,
}) => {
  const playerNickname = useAppSelector((state) => state.localSlice.nickname);

  return (
    <Card
      dir="rtl"
      className={classNames(
        "w-[85%] min-h-[150px] rounded-xl shadow-[0_2px_8px_0_rgba(0,0,0,0.25)] py-3 justify-between",
        {
          "bg-secondary/[.75]": nickname == playerNickname,
          "bg-[#5CE38B]": nickname != playerNickname,
        }
      )}
    >
      <p className="font-thin">
        {nickname + (nickname == playerNickname ? " (انت)" : "")}
      </p>
      <p className="font-bold text-2xl my-3 text-ellipsis overflow-hidden">
        {!value || value === "" ? "------" : value}
      </p>
      <div className="flex justify-center gap-3" dir="ltr">
        {[0, 5, 10].map((vote) => {
          const isValueEmpty = value == undefined || value == "";
          const isActiveVote = activeVote == vote;
          return (
            <VotingCircle
              key={vote}
              vote={vote}
              active={isActiveVote}
              canChangeVote={!isValueEmpty && !disableVotes}
              locked={locked}
              onClick={() => onVoteChange(nickname, vote)}
              votes={(votes || {})[vote] || []}
            />
          );
        })}
      </div>
    </Card>
  );
};

export default WordVotingCard;
