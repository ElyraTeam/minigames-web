'use client';

import useUIStore from '@/state/ui';
import { State } from '@/types/word';
import useGameStore from '@/state/game';
import { getPlayerById } from '@/lib/word';
import usePlayersStore from '@/state/players';
import useCurrentGame from '@/hooks/use-current-game';

import WordCard from './word-card';
import WordGame from './game/word-game';
import WordVoting from './game/word-voting';
import WordCountdown from './word-countdown';
import WordGameHeader from './word-game-header';
import WordActionButton from './word-action-button';
import WordGameContent from './word-game-content';
import WordGameSettings from './lobby/word-game-settings';
import WordWinnersModal from './leaderboard/word-winners-modal';

interface WordMainCardProps {
  roomId: string;
}

const WordMainCard: React.FC<WordMainCardProps> = ({ roomId }) => {
  const game = useGameStore((state) => state.game);
  const players = usePlayersStore((state) => state.players?.players) || [];
  const winnersOpen = useUIStore((state) => state.winnersOpen);
  const setWinnersOpen = useUIStore((state) => state.setWinnersOpen);
  const winners = useGameStore((state) => state.winners);
  const { countdown } = useCurrentGame(roomId);

  const renderContentFromState = () => {
    if (game && countdown) {
      if (game.state === State.VOTING) {
        return (
          <WordCountdown
            title={
              <>
                انتهي{' '}
                <span className="text-word-secondary-500/40">
                  {(game.stopClicker &&
                    getPlayerById(players, game.stopClicker)?.nickname) ||
                    'شخص'}
                </span>{' '}
                من الكتابة!
              </>
            }
            subtitle="سيبدأ التصويت بعد:"
            countdown={countdown}
          />
        );
      }
      return (
        <WordCountdown
          title="استعد للكتابة!"
          subtitle="ستبدأ الجولة بعد:"
          countdown={countdown}
        />
      );
    }
    if (!game || game.state === State.LOBBY || game.state === State.GAME_OVER)
      return <WordGameSettings />;
    if (game.state === State.INGAME) return <WordGame />;
    if (game.state === State.VOTING) return <WordVoting />;
  };

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      {winners && (
        <WordWinnersModal
          isOpen={winnersOpen}
          onOpenChange={(open) => setWinnersOpen(open)}
          winners={winners}
        />
      )}
      <WordCard className="
        flex min-h-0 flex-col overflow-hidden bg-word-game-600 px-3 py-3
        lg:bg-word-game lg:px-6
      ">
        {/* Header - desktop only */}
        <div className="
          hidden
          lg:block
        ">
          <WordGameHeader />
        </div>
        <WordGameContent>{renderContentFromState()}</WordGameContent>
        {/* Button - desktop only (mobile uses bottom bar) */}
        <div className="
          hidden
          lg:flex lg:justify-center
        ">
          <WordActionButton />
        </div>
      </WordCard>
    </div>
  );
};

export default WordMainCard;
