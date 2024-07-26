import { cn } from "@/lib/utils";
import useVoteStore from "@/state/vote";
import { getPlayerById } from "@/lib/word";
import Tooltip from "@/components/ui/tooltip";
import usePlayersStore from "@/state/players";
import { availableVotes, Vote } from "@/config/word";

interface WordVotingCardProps {
  playerId: string;
  name: string;
  value: string;
  vote?: Vote;
  selectedCard?: boolean;
  onChangeVote: (vote: Vote) => any;
}

const WordVotingCard: React.FC<WordVotingCardProps> = ({
  playerId, //Who owns the card
  name,
  value,
  vote,
  selectedCard,
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
        "bg-word-game/70 py-4 px-12 rounded-2xl space-y-8 text-center shadow-lg",
        selectedCard && "bg-word-secondary/70"
      )}
    >
      <p className="font-light text-white/70 leading-none">{name}</p>
      <h3 className="font-semibold leading-none">{value}</h3>
      <div className="flex flex-row rtl:flex-row-reverse justify-center items-center gap-6">
        {availableVotes.map((voteNumber) => (
          <Tooltip
            text={
              votesToPlayers[voteNumber]
                ? votesToPlayers[voteNumber].join("\n")
                : undefined
            }
            key={`word-voting-card-${name}-${voteNumber}`}
          >
            <div
              className={cn(
                "flex items-center justify-center bg-white/20 rounded-full w-8 h-8 hover:bg-white/30 transition-colors font-semibold cursor-pointer",
                !selectedCard &&
                  vote === voteNumber &&
                  "border-2 bg-word-secondary hover:bg-word-secondary/80"
              )}
              onClick={() => onChangeVote(voteNumber)}
            >
              <p>{voteNumber}</p>
            </div>
          </Tooltip>
        ))}
      </div>
    </div>
  );
};

export default WordVotingCard;
