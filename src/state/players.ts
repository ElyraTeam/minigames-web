import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface GamePlayersState {
  players?: GamePlayersSync | null;
  newPlayersCount: number;
  setPlayers: (players: GamePlayersSync) => void;
  clearNewPlayers: () => void;
}

const usePlayersStore = create<GamePlayersState>()(
  devtools((set, get) => ({
    players: null,
    newPlayersCount: 0,
    setPlayers: (players) => {
      const currentPlayers = get().players;
      const currentCount = currentPlayers?.players?.length || 0;
      const newCount = players.players?.length || 0;
      // Only count as new if we already had players (not initial load)
      const joined = currentPlayers && newCount > currentCount ? newCount - currentCount : 0;
      set((state) => ({
        players,
        newPlayersCount: state.newPlayersCount + joined,
      }));
    },
    clearNewPlayers: () => set({ newPlayersCount: 0 }),
  }))
);

export default usePlayersStore;
