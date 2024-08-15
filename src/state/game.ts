import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface GameState {
  game?: GameSync | null;
  winners?: Player[] | null;
  setGame: (game: GameSync) => void;
  setWinners: (winners?: Player[] | null) => void;
}

const useGameStore = create<GameState>()(
  devtools((set) => ({
    game: null,
    winners: null,
    setGame: (game) => set(() => ({ game })),
    setWinners: (winners) => set(() => ({ winners })),
  }))
);

export default useGameStore;
