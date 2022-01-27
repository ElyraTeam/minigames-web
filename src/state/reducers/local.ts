import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, AppDispatch } from '../store';
import { HYDRATE } from 'next-redux-wrapper';

const initialState: LocalState = {};

const localSlice = createSlice({
  name: 'local',
  initialState,
  reducers: {
    setToken(state, action: PayloadAction<string>) {
      state.token = action.payload;
    },
    setPlayer(state, action: PayloadAction<Player>) {
      state.plr = action.payload;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      console.log('HYDRATE', state, action.payload);
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const savePlayer =
  (plr: Player): AppThunk =>
  async (dispatch: AppDispatch) => {
    localStorage.setItem('plr', JSON.stringify(plr));
    dispatch(setPlayer(plr));
  };

export const { setToken, setPlayer } = localSlice.actions;

export default localSlice.reducer;
