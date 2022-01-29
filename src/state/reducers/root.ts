import { combineReducers } from "@reduxjs/toolkit";
import gameSlice from "./game";
import localSlice from "./local";
import playersSlice from "./players";
import roomSlice from "./room";
import chatSlice from "./chat";

const rootReducer = combineReducers({
  gameSlice,
  localSlice,
  playersSlice,
  roomSlice,
  chatSlice,
});

export default rootReducer;
