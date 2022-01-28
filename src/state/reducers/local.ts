import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, AppDispatch } from '../store';
import { HYDRATE } from 'next-redux-wrapper';
import { setGame } from './game';
import { setPlayers } from './players';
import { setRoom } from './room';

const initialState: LocalState = {};

const localSlice = createSlice({
  name: 'local',
  initialState,
  reducers: {
    setToken(state, action: PayloadAction<string>) {
      state.token = action.payload;
    },
    setNickname(state, action: PayloadAction<string>) {
      state.nickname = action.payload;
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

export const saveNickname =
  (nickname: string): AppThunk =>
  async (dispatch: AppDispatch) => {
    localStorage.setItem('nickname', nickname);
    dispatch(setNickname(nickname));
  };

export const resetData = (): AppThunk => async (dispatch: AppDispatch) => {
  dispatch(setToken(''));
  dispatch(setRoom({}));
  dispatch(setGame({}));
  dispatch(setPlayers({}));
};

export const { setToken, setNickname } = localSlice.actions;

export default localSlice.reducer;
