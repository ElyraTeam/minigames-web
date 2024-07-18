import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface GamePlayersState {
  players: GamePlayersSync | null | undefined;
  setPlayers: (players: GamePlayersSync) => void;
}

const usePlayersStore = create<GamePlayersState>()(
  devtools((set) => ({
    players: null,
    setPlayers: (players) => set(() => ({ players })),
  }))
);

export default usePlayersStore;
