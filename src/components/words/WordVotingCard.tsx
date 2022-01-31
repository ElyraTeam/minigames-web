import classNames from 'classnames';
import { useState } from 'react';
import Card from '../shared/Card';

interface WordVotingCardProps {
  nickname: string;
  value: string;
  onVoteChange: (nickname: string, vote: number) => void;
  activeVote: number;
  hideVotes?: boolean;
  locked?: boolean;
}

interface VotingCircleProps {
  vote: number;
  onClick?: () => void;
  active?: boolean;
  canChangeVote?: boolean;
  locked?: boolean;
}

const VotingCircle: React.FC<VotingCircleProps> = ({
  vote,
  onClick,
  active,
  canChangeVote,
  locked,
}) => {
  return (
    <div
      className={classNames(
        'text-[0.92rem] font-semibold rounded-full w-7 h-7 bg-[#eee] bg-opacity-20 flex align-middle justify-center items-center font-[arial] cursor-pointer hover:bg-opacity-40 transition-colors ',
        {
          'bg-secondary bg-opacity-100 border-2': active,
          'bg-secondary bg-opacity-60 border-2': active && locked,
        }
      )}
      onClick={canChangeVote ? onClick : undefined}
    >
      {vote}
    </div>
  );
};

const WordVotingCard: React.FC<WordVotingCardProps> = ({
  nickname,
  value,
  activeVote,
  onVoteChange,
  hideVotes,
  locked,
}) => {
  return (
    <Card
      dir="rtl"
      className="w-[85%] min-h-[150px] rounded-xl bg-[#5CE38B] shadow-[0_2px_8px_0_rgba(0,0,0,0.25)] py-3 justify-between"
    >
      <p className="font-thin">{nickname}</p>
      <p className="font-bold text-2xl">
        {!value || value === ''
          ? '------'
          : value.length > 10
          ? value.slice(0, 10) + '...'
          : value}
      </p>
      <div className="flex justify-center gap-3" dir="ltr">
        {!hideVotes &&
          [0, 5, 10].map((vote) => {
            const isValueEmpty = value == undefined || value == '';
            const isActiveVote = activeVote == vote;
            return (
              <VotingCircle
                key={vote}
                vote={vote}
                active={isActiveVote}
                canChangeVote={!isValueEmpty}
                locked={locked}
              />
            );
          })}
      </div>
    </Card>
  );
};

export default WordVotingCard;
