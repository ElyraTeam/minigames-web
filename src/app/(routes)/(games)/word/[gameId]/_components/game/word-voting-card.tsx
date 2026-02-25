import { useTranslations } from 'next-intl';

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
  const t = useTranslations('WordGame');
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
        `
          grid w-full grid-rows-[40px_90px_90px] items-center overflow-hidden
          rounded-2xl border-[3px] bg-word-game/50 text-center
          sm:grid-cols-[min(150px,100%)_2fr_min(200px,100%)] sm:grid-rows-none
          lg:grid-cols-none lg:grid-rows-[60px_100px_100px]
          2xl:grid-cols-[min(175px,100%)_2fr_min(200px,100%)] 2xl:grid-rows-none
        `,
        selectedCard && 'bg-word-secondary/70'
      )}
    >
      <p className="
        2xl mx-auto border-b-4 border-white/30 p-3 text-lg leading-none
        text-white
        sm:mx-0 sm:border-b-0 sm:border-l-2
        lg:mx-auto lg:border-b-4 lg:border-l-0 lg:text-xl
        2xl:mx-0 2xl:border-b-0 2xl:border-l-2
      ">
        {name} {selectedCard && t('you')}
      </p>
      <h3 className="
        text-3xl leading-none font-black
        lg:text-4xl
      ">{value}</h3>
      <div className="
        2xl flex h-full flex-row items-center justify-center gap-1 self-end
        rounded-2xl bg-black/5 px-2 py-8
        xs:px-4
        sm:flex-col sm:gap-3
        lg:flex-row
        xl:flex-col
        2xl:gap-3 2xl:px-9
        sm:rtl:flex-col-reverse
        lg:rtl:flex-row-reverse
        2xl:rtl:flex-col-reverse
      ">
        {availableVotes.map((voteNumber) => (
          <div
            className="
              2xl flex w-full flex-col items-center justify-between gap-2
              xs:gap-4
              sm:flex-row
              lg:flex-col
              2xl:flex-row 2xl:gap-7
            "
            key={`word-voting-card-${name}-${voteNumber}`}
          >
            <Tooltip
              delayDuration={0}
              className="px-3 py-2"
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
                  `
                    flex h-5 w-5 items-center justify-center rounded-full border
                    border-white/50 bg-white/10 p-2.5 text-xs font-semibold
                    transition-colors
                    hover:bg-white/20
                  `
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
                `
                  w-16
                  sm:w-32
                  lg:w-20
                `,
                !selectedCard &&
                  vote === voteNumber &&
                  `
                    bg-word-secondary transition-colors
                    hover:bg-word-secondary/80
                    disabled:hover:bg-word-secondary
                  `
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
