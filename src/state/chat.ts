import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { uid } from '@/lib/utils';

interface ChatState {
  messages: ChatMessage[];
  newMessages: number;
  isMobileChatOpen: boolean;
  addChatMessage: (msg: ChatMessageServer) => void;
  resetChatMessages: () => void;
  addNewMessage: () => void;
  clearNewMessages: () => void;
  setMobileChatOpen: (open: boolean) => void;
}

const useChatStore = create<ChatState>()(
  devtools((set) => ({
    messages: [],
    newMessages: 0,
    isMobileChatOpen: false,
    addChatMessage: (msg) =>
      set(({ messages }) => ({
        messages: [
          ...messages,
          { ...msg, parts: msg.parts.map((part) => ({ ...part, id: uid() })) },
        ],
      })),
    resetChatMessages: () => set(() => ({ messages: [] })),
    addNewMessage: () =>
      set((state) => ({ newMessages: state.newMessages + 1 })),
    clearNewMessages: () => set(() => ({ newMessages: 0 })),
    setMobileChatOpen: (open) => set(() => ({ isMobileChatOpen: open })),
  }))
);

export default useChatStore;
