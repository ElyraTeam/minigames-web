import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface GameState {
  game?: GameSync | null;
  winners?: Player[] | null;
  countdown: number;
  setGame: (game: GameSync) => void;
  setWinners: (winners?: Player[] | null) => void;
  setCountdown: (countdown: number) => void;
}

const useGameStore = create<GameState>()(
  devtools((set) => ({
    game: null,
    winners: null,
    countdown: 0,
    setGame: (game) => set(() => ({ game })),
    setWinners: (winners) => set(() => ({ winners })),
    setCountdown: (countdown) => set(() => ({ countdown })),
  }))
);

export default useGameStore;
