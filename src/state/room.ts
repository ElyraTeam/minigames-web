import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface RoomState {
  options?: GameOptionsSync | null;
  setRoom: (options: GameOptionsSync) => void;
  updateRoom: (options: RoomOptions) => void;
}

const useRoomStore = create<RoomState>()(
  devtools((set) => ({
    options: null,
    setRoom: (options) => set(() => ({ options })),
    updateRoom: (options) =>
      set((state) => ({ options: { ...state.options, options } })),
  }))
);

export default useRoomStore;
