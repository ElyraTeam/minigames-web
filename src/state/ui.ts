import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface UIState {
  winnersOpen: boolean;
  setWinnersOpen: (winnersOpen: boolean) => void;
}

const useUIStore = create<UIState>()(
  devtools((set) => ({
    winnersOpen: false,
    setWinnersOpen: (winnersOpen) => set({ winnersOpen }),
  }))
);

export default useUIStore;
