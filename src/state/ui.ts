import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface UIState {
  winnersOpen: boolean;
  setWinnersOpen: (winnersOpen: boolean) => void;
  playersSidebarOpen: boolean;
  setPlayersSidebarOpen: (playersSidebarOpen: boolean) => void;
}

const useUIStore = create<UIState>()(
  devtools((set) => ({
    winnersOpen: false,
    setWinnersOpen: (winnersOpen) => set({ winnersOpen }),
    playersSidebarOpen: false,
    setPlayersSidebarOpen: (playersSidebarOpen) => set({ playersSidebarOpen }),
  }))
);

export default useUIStore;
