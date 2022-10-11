import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '..';
import { TUser, TRequestStatus } from '../../common.types';

interface TUserState {
  data?: TUser;
  requestStatus: TRequestStatus;
}

const initialState: TUserState = {
  data: undefined,
  requestStatus: 'sleep',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    intentFetchUserData: (state) => {
      state.requestStatus = 'loading';
    },
    setUserData: (state, { payload }: PayloadAction<TUser>) => {
      state.requestStatus = 'success';
      state.data = payload;
    },
    setRequestStatus: (state, { payload }: PayloadAction<TRequestStatus>) => {
      state.requestStatus = payload;
    },
  },
});

export const UserActions = userSlice.actions;

export const getUserRequestStatus = (state: RootState) =>
  state.user.requestStatus;
export const getUserData = (state: RootState) => state.user.data;

export default userSlice.reducer;
