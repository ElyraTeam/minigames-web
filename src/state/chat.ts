import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface ChatState {
  messages: ChatMessage[];
  addChatMessage: (msg: ChatMessage) => void;
}

const useChatStore = create<ChatState>()(
  devtools((set) => ({
    messages: [],
    addChatMessage: (msg) =>
      set(({ messages }) => ({ messages: [...messages, msg] })),
  }))
);

export default useChatStore;