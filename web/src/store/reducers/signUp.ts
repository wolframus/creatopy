import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '..';
import { TRequestStatus, TSignUpRequestPayload } from '../../common.types';

interface ISignUpState {
  requestStatus: TRequestStatus;
}

const initialState: ISignUpState = {
  requestStatus: 'sleep',
};

export const signUpSlice = createSlice({
  name: 'signUp',
  initialState,
  reducers: {
    intentSubmit: (state, _action: PayloadAction<TSignUpRequestPayload>) => {
      state.requestStatus = 'loading';
    },
    setSignUpStatus: (state, payload: PayloadAction<TRequestStatus>) => {
      state.requestStatus = payload.payload;
    },
  },
});

export const SignUpActions = signUpSlice.actions;

export const getSignUpRequestStatus = (state: RootState) =>
  state.signUp.requestStatus;

export default signUpSlice.reducer;
