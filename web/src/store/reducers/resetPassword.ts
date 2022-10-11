import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import {
  TRequestStatus,
  TSubmitResetPasswordPayload,
} from '../../common.types';
import { RootState } from '..';

interface IResetPasswordState {
  allowResetPassword: boolean;
  requestStatus: TRequestStatus;
}

const initialState: IResetPasswordState = {
  requestStatus: 'sleep',
  allowResetPassword: false,
};

export const resetPasswordSlice = createSlice({
  name: 'resetPassword',
  initialState,
  reducers: {
    intentSubmit: (
      state,
      _action: PayloadAction<TSubmitResetPasswordPayload>
    ) => {
      state.requestStatus = 'loading';
    },
    setRequestStatus: (state, { payload }: PayloadAction<TRequestStatus>) => {
      state.requestStatus = payload;
    },
    setAllowResetPassword: (state, { payload }: PayloadAction<boolean>) => {
      state.allowResetPassword = payload;
      state.requestStatus = payload ? 'sleep' : 'error';
    },
    submitResetPassword: (
      state,
      _action: PayloadAction<TSubmitResetPasswordPayload>
    ) => {
      state.requestStatus = 'loading';
    },
  },
});

export const ResetPasswordActions = resetPasswordSlice.actions;

export const getAllowResetPassword = (state: RootState) =>
  state.resetPassword.allowResetPassword;
export const getResetPasswordStatus = (state: RootState) =>
  state.resetPassword.requestStatus;

export default resetPasswordSlice.reducer;
