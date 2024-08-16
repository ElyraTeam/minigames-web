import { cn } from '@/lib/utils';
import useVoteStore from '@/state/vote';
import { getPlayerById } from '@/lib/word';
import Tooltip from '@/components/ui/tooltip';
import usePlayersStore from '@/state/players';
import { availableVotes, Vote } from '@/config/word';
import WordButton from '@/components/word/word-button';

interface WordVotingCardProps {
  playerId: string;
  name: string;
  value: string;
  vote?: Vote;
  selectedCard?: boolean;
  voted?: boolean;
  hasValue?: boolean;
  onChangeVote: (vote: Vote) => any;
}

const WordVotingCard: React.FC<WordVotingCardProps> = ({
  playerId, //Who owns the card
  name,
  value,
  vote,
  selectedCard,
  voted = false,
  hasValue,
  onChangeVote,
}) => {
  const playerVotes = useVoteStore((state) => state.votes);
  const players = usePlayersStore((state) => state.players?.players) || [];
  const getVotesToPlayers = () => {
    const allVotes: { [vote: number]: string[] } = {};

    for (const whoVoted in playerVotes) {
      const hisVoteToCardOwner = playerVotes[whoVoted][playerId];
      const playerWhoVoted = getPlayerById(players, whoVoted)?.nickname;
      if (hisVoteToCardOwner != undefined && playerWhoVoted) {
        if (!allVotes[hisVoteToCardOwner]) {
          allVotes[hisVoteToCardOwner] = [];
        }
        allVotes[hisVoteToCardOwner].push(playerWhoVoted);
      }
    }
    return allVotes;
  };

  const votesToPlayers = getVotesToPlayers();

  return (
    <div
      className={cn(
        'grid grid-rows-[60px_100px_100px] sm:grid-cols-[min(150px,100%)_2fr_min(200px,100%)] sm:grid-rows-none lg:grid-rows-[60px_100px_100px] lg:grid-cols-none 2xl:grid-rows-none 2xl:grid-cols-[min(175px,100%)_2fr_min(200px,100%)] items-center bg-word-game/50 rounded-2xl text-center w-full overflow-hidden border-[3px]',
        selectedCard && 'bg-word-secondary/70'
      )}
    >
      <p className="text-lg lg:text-xl text-white leading-none p-3 mx-auto sm:mx-0 lg:mx-auto 2xl 2xl:mx-0 border-b-4 sm:border-l-2 sm:border-b-0 lg:border-b-4 lg:border-l-0 2xl 2xl:border-b-0 2xl 2xl:border-l-2 border-white/30">
        {name}
      </p>
      <h3 className="text-3xl lg:text-4xl font-black leading-none">{value}</h3>
      <div className="flex flex-row sm:flex-col sm:rtl:flex-col-reverse lg:flex-row lg:rtl:flex-row-reverse xl:flex-col bg-black/5 py-8 px-2 xs:px-4 2xl 2xl:px-9 h-full 2xl 2xl:rtl:flex-col-reverse justify-center items-center rounded-2xl self-end gap-1 sm:gap-3 2xl 2xl:gap-3">
        {availableVotes.map((voteNumber) => (
          <div
            className="flex flex-col sm:flex-row lg:flex-col 2xl 2xl:flex-row w-full items-center justify-between gap-2 xs:gap-4 2xl 2xl:gap-7"
            key={`word-voting-card-${name}-${voteNumber}`}
          >
            <Tooltip
              delayDuration={0}
              className="py-2 px-3"
              text={
                votesToPlayers[voteNumber]
                  ? votesToPlayers[voteNumber].map((plr) => (
                      <p key={`word-vote-name-${plr}`}>{plr}</p>
                    ))
                  : null
              }
            >
              <div
                className={cn(
                  'text-xs flex items-center justify-center bg-white/10 rounded-full p-[10px] w-5 h-5 hover:bg-white/20 transition-colors font-semibold border-[1px] border-white/50'
                )}
              >
                <p>{votesToPlayers[voteNumber]?.length || 0}</p>
              </div>
            </Tooltip>
            <WordButton
              variant="solid"
              dir="ltr"
              onClick={() => onChangeVote(voteNumber)}
              className={cn(
                'w-16 sm:w-32 lg:w-20',
                !selectedCard &&
                  vote === voteNumber &&
                  'bg-word-secondary hover:bg-word-secondary/80 transition-colors disabled:hover:bg-word-secondary'
              )}
              disabled={selectedCard || !hasValue || voted}
            >
              {voteNumber == 0 ? voteNumber : `+${voteNumber}`}
            </WordButton>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WordVotingCard;
