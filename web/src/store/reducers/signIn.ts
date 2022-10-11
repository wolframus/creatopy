import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '..';
import { TRequestStatus, TSignInRequestPayload } from '../../common.types';

interface ISignInState {
  requestStatus: TRequestStatus;
}

const initialState: ISignInState = {
  requestStatus: 'sleep',
};

export const signInSlice = createSlice({
  name: 'signIn',
  initialState,
  reducers: {
    intentSubmit: (state, _action: PayloadAction<TSignInRequestPayload>) => {
      state.requestStatus = 'loading';
    },
    setSignInStatus: (state, payload: PayloadAction<TRequestStatus>) => {
      state.requestStatus = payload.payload;
    },
  },
});

export const SignInActions = signInSlice.actions;

export const getSignInRequestStatus = (state: RootState) =>
  state.signIn.requestStatus;

export default signInSlice.reducer;
