import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface LocalState {
  nickname?: string | null;
  token?: string | null;
  categoryInputValues: CategoryValues;
  nextRoute?: string;
  isMuted: boolean;
  setNickname: (nickname: string) => void;
  setToken: (token: string) => void;
  toggleMute: () => void;
}

const useLocalStore = create<LocalState>()(
  devtools(
    persist(
      (set) => ({
        nickname: null,
        token: null,
        isMuted: false,
        categoryInputValues: {},
        setNickname: (nickname) => set(() => ({ nickname })),
        setToken: (token) => set(() => ({ token })),
        toggleMute: () => set((state) => ({ isMuted: !state.isMuted })),
      }),
      {
        name: 'local-player-storage',
        partialize: (state) =>
          Object.fromEntries(
            Object.entries(state).filter(
              ([key]) => !['categoryInputValues'].includes(key)
            )
          ),
      }
    )
  )
);

export default useLocalStore;
