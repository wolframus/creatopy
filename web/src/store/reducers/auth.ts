import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '..';
import { TRequestStatus } from '../../common.types';

interface IAuthState {
  token?: string | null;
  requestStatus: TRequestStatus;
}

const initialState: IAuthState = {
  token: null,
  requestStatus: 'loading',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, { payload }: PayloadAction<IAuthState['token']>) => {
      state.token = payload;
      state.requestStatus = payload ? 'success' : 'sleep';
    },
    intentAuthenticate: (state) => {
      state.requestStatus = 'loading';
    },
    setRequestStatus: (state, { payload }: PayloadAction<TRequestStatus>) => {
      state.requestStatus = payload;
    },
    intentLogOut: (state) => {
      state.requestStatus = 'sleep';
    },
  },
});

export const AuthActions = authSlice.actions;

export const getAuthenticationToken = (state: RootState) => state.auth.token;
export const getAuthenticationRequestStatus = (state: RootState) =>
  state.auth.requestStatus;

export default authSlice.reducer;
