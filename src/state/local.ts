import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface SavedGameSettings {
  maxPlayers?: number;
  rounds?: number;
  letters?: string[];
  categories?: string[];
}

interface LocalState {
  playerId?: string | null;
  nickname?: string | null;
  token?: string | null;
  httpToken?: string | null;
  categoryInputValues: CategoryValues;
  isMuted: boolean;
  showNicknameModal: boolean;
  savedGameSettings: SavedGameSettings;
  setPlayerId: (playerId: string) => void;
  setNickname: (nickname: string) => void;
  setToken: (token: string) => void;
  setHttpToken: (httpToken: string) => void;
  toggleMute: () => void;
  setCategoryInputValues: (values: CategoryValues) => void;
  setShowNicknameModal: (show: boolean) => void;
  setSavedGameSettings: (settings: SavedGameSettings) => void;
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
        showNicknameModal: false,
        savedGameSettings: {},
        setNickname: (nickname) => set(() => ({ nickname })),
        setToken: (token) => set(() => ({ token })),
        setHttpToken: (httpToken) => set(() => ({ httpToken })),
        toggleMute: () => set((state) => ({ isMuted: !state.isMuted })),
        setPlayerId: (playerId) => set(() => ({ playerId })),
        setCategoryInputValues: (categoryInputValues) =>
          set(() => ({ categoryInputValues })),
        setShowNicknameModal: (showNicknameModal) =>
          set(() => ({ showNicknameModal })),
        setSavedGameSettings: (savedGameSettings) =>
          set(() => ({ savedGameSettings })),
      }),
      {
        name: 'local-player-storage',
        partialize: (state) =>
          Object.fromEntries(
            Object.entries(state).filter(
              ([key]) =>
                !['categoryInputValues', 'showNicknameModal'].includes(key)
            )
          ),
      }
    )
  )
);

export default useLocalStore;
