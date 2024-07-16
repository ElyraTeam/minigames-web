import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface LocalState {
  nickname: string;
  setNickname: (nickname: string) => void;
}

const useLocalStore = create<LocalState>()(
  devtools(
    persist(
      (set) => ({
        nickname: '',
        setNickname: (nickname) => set(() => ({ nickname })),
      }),
      {
        name: 'local-player-storage',
      }
    )
  )
);

export default useLocalStore;
