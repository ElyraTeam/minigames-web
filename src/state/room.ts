import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface RoomState {
  options: GameOptionsSync | null | undefined;
  setRoom: (options: GameOptionsSync) => void;
}

const useRoomStore = create<RoomState>()(
  devtools((set) => ({
    options: null,
    setRoom: (options) => set(() => ({ options })),
  }))
);

export default useRoomStore;
