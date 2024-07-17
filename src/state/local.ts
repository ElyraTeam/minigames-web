import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface LocalState {
  nickname: string | undefined | null;
  token: string | undefined | null;
  setNickname: (nickname: string) => void;
  setToken: (token: string) => void;
}

const useLocalStore = create<LocalState>()(
  devtools(
    persist(
      (set) => ({
        nickname: null,
        token: null,
        setNickname: (nickname) => set(() => ({ nickname })),
        setToken: (token) => set(() => ({ token })),
      }),
      {
        name: 'local-player-storage',
      }
    )
  )
);

export default useLocalStore;
