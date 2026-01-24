import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface LocalState {
  playerId?: string | null;
  nickname?: string | null;
  token?: string | null;
  httpToken?: string | null;
  categoryInputValues: CategoryValues;
  isMuted: boolean;
  setPlayerId: (playerId: string) => void;
  setNickname: (nickname: string) => void;
  setToken: (token: string) => void;
  setHttpToken: (httpToken: string) => void;
  toggleMute: () => void;
  setCategoryInputValues: (values: CategoryValues) => void;
}

const useLocalStore = create<LocalState>()(
  devtools(
    persist(
      (set) => ({
        nickname: null,
        playerId: null,
        token: null,
        httpToken: null,
        isMuted: false,
        categoryInputValues: {},
        setNickname: (nickname) => set(() => ({ nickname })),
        setToken: (token) => set(() => ({ token })),
        setHttpToken: (httpToken) => set(() => ({ httpToken })),
        toggleMute: () => set((state) => ({ isMuted: !state.isMuted })),
        setPlayerId: (playerId) => set(() => ({ playerId })),
        setCategoryInputValues: (categoryInputValues) =>
          set(() => ({ categoryInputValues })),
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
