import { configureStore, Action } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import { ThunkAction } from "redux-thunk";

import rootReducer from "./reducers/root";

let store: AppStore;

const makeStore = () => {
  const myStore = configureStore({
    reducer: rootReducer,
  });
  store = myStore;
  return myStore;
};

export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore["dispatch"];
export type AppState = ReturnType<AppStore["getState"]>;
export type AppThunk<ReturnType = any> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action
>;

const wrapper = createWrapper<AppStore>(makeStore);

export { store };
export default wrapper;
