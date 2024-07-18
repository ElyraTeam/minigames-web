import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface LocalState {
  nickname?: string | null;
  token?: string | null;
  categoryInputValues: CategoryValues;
  nextRoute?: string;
  setNickname: (nickname: string) => void;
  setToken: (token: string) => void;
}

const useLocalStore = create<LocalState>()(
  devtools(
    persist(
      (set) => ({
        nickname: null,
        token: null,
        categoryInputValues: {},
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
