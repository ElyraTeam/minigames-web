import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { uid } from '@/lib/utils';

interface ChatState {
  messages: ChatMessage[];
  addChatMessage: (msg: ChatMessageServer) => void;
  resetChatMessages: () => void;
}

const useChatStore = create<ChatState>()(
  devtools((set) => ({
    messages: [],
    addChatMessage: (msg) =>
      set(({ messages }) => ({
        messages: [
          ...messages,
          { ...msg, parts: msg.parts.map((part) => ({ ...part, id: uid() })) },
        ],
      })),
    resetChatMessages: () => set(() => ({ messages: [] })),
  }))
);

export default useChatStore;
