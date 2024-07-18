import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface GameState {
  game: GameSync | null | undefined;
  setGame: (game: GameSync) => void;
}

const useGameStore = create<GameState>()(
  devtools((set) => ({
    game: null,
    setGame: (game) => set(() => ({ game })),
  }))
);

export default useGameStore;
