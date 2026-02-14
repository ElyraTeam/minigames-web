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
import WordGameButton from './word-game-button';
import WordGameHeader from './word-game-header';
import WordGameContent from './word-game-content';
import WordDoneButton from './game/word-done-button';
import WordReadyButton from './lobby/word-ready-button';
import WordGameSettings from './lobby/word-game-settings';
import WordResetGame from './leaderboard/word-reset-game';
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

  const renderButtonFromState = () => {
    if (countdown) return <WordGameButton className="invisible" />;
    if (!game || game.state === State.LOBBY) return <WordReadyButton />;
    if (game.state === State.VOTING || game.state === State.INGAME)
      return <WordDoneButton state={game.state} />;
    if (game.state === State.GAME_OVER) return <WordResetGame />;
    return <WordGameButton className="invisible" />;
  };

  return (
    <div className="flex flex-col flex-1 min-h-0">
      {winners && (
        <WordWinnersModal
          isOpen={winnersOpen}
          onOpenChange={(open) => setWinnersOpen(open)}
          winners={winners}
        />
      )}
      <WordCard className="flex flex-col min-h-0 bg-word-game-600 lg:bg-word-game py-3 px-3 lg:px-6 overflow-hidden">
        {/* Header - desktop only */}
        <div className="hidden lg:block">
          <WordGameHeader />
        </div>
        <WordGameContent>{renderContentFromState()}</WordGameContent>
        {/* Button - desktop only (mobile uses bottom bar) */}
        <div className="hidden lg:flex lg:justify-center">
          {renderButtonFromState()}
        </div>
      </WordCard>
    </div>
  );
};

export default WordMainCard;
