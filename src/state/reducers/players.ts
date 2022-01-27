import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

const initialState: GamePlayersSync = {};

const playersSlice = createSlice({
  name: "plrs",
  initialState,
  reducers: {
    setPlayers(state, action: PayloadAction<GamePlayersSync>) {
      return action.payload;
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

export const { setPlayers } = playersSlice.actions;

export default playersSlice.reducer;
