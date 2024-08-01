import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { uid } from '@/lib/utils';

interface ChatState {
  messages: ChatMessage[];
  newMessages: number;
  addChatMessage: (msg: ChatMessageServer) => void;
  resetChatMessages: () => void;
  addNewMessage: () => void;
  clearNewMessages: () => void;
}

const useChatStore = create<ChatState>()(
  devtools((set) => ({
    messages: [],
    newMessages: 0,
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
  }))
);

export default useChatStore;
