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
  onChangeVote: (vote: Vote) => any;
}

const WordVotingCard: React.FC<WordVotingCardProps> = ({
  playerId, //Who owns the card
  name,
  value,
  vote,
  selectedCard,
  voted = false,
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
        'grid grid-cols-[min(150px,100%)_2fr_min(200px,100%)] justify-between items-center bg-word-game/50 rounded-2xl text-center w-full overflow-hidden border-2',
        selectedCard && 'bg-word-secondary/70'
      )}
    >
      <p className="text-lg lg:text-xl text-white leading-none border-l-2 border-white/20">
        {name}
      </p>
      <h3 className="text-3xl lg:text-4xl font-black leading-none">{value}</h3>
      <div className="flex flex-col bg-black/5 py-8 px-9 h-full rtl:flex-col-reverse justify-center items-center gap-4 rounded-2xl self-end">
        {availableVotes.map((voteNumber) => (
          <div
            className="flex w-full items-center justify-between gap-7"
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
                'w-20',
                !selectedCard &&
                  vote === voteNumber &&
                  'bg-word-secondary hover:bg-word-secondary/80 transition-colors disabled:hover:bg-word-secondary'
              )}
              disabled={selectedCard || value.trim().length <= 1 || voted}
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
