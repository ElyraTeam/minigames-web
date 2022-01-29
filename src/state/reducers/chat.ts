import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

const initialState: ChatMessage[] = [];

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setChat(state, action: PayloadAction<ChatMessage[]>) {
      return action.payload;
    },
    addChatMessage(state, action: PayloadAction<ChatMessage>) {
      state.push(action.payload);
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      console.log("HYDRATE", state, action.payload);
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const { setChat, addChatMessage } = chatSlice.actions;

export default chatSlice.reducer;
