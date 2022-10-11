import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '..';
import { TToastTypes } from '../../common.types';

interface TToastState {
  show: boolean;
  title: string;
  type?: TToastTypes;
  description: string;
}

const initialState: TToastState = {
  description: '',
  show: false,
  title: '',
};

export const toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    showToast: (
      state,
      {
        payload,
      }: PayloadAction<Omit<TToastState, 'show'> & { type: TToastTypes }>
    ) => {
      state.show = true;
      state.type = payload.type;
      state.title = payload.title;
      state.description = payload.description;
    },
    hideToast: (state) => {
      state.show = false;
      state.type = undefined;
      state.title = initialState.title;
      state.description = initialState.description;
    },
  },
});

export const ToastActions = toastSlice.actions;

export const getToastData = (state: RootState) => state.toast;

export default toastSlice.reducer;
