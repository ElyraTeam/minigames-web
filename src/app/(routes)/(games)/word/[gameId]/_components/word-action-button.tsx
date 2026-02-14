'use client';

import { State } from '@/types/word';
import useGameStore from '@/state/game';

import WordGameButton from './word-game-button';
import WordDoneButton from './game/word-done-button';
import WordResetGame from './leaderboard/word-reset-game';
import WordReadyButton from './lobby/word-ready-button';

const WordActionButton: React.FC = () => {
  const game = useGameStore((state) => state.game);
  const countdown = useGameStore((state) => state.countdown);

  if (countdown) return <WordGameButton className="invisible" />;
  if (!game || game.state === State.LOBBY) return <WordReadyButton />;
  if (game.state === State.VOTING || game.state === State.INGAME)
    return <WordDoneButton state={game.state} />;
  if (game.state === State.GAME_OVER) return <WordResetGame />;
  return <WordGameButton className="invisible" />;
};

export default WordActionButton;
