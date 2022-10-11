import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '..';
import { TPost, TRequestStatus, TSubmitFeedPost } from '../../common.types';

interface IHomeState {
  create: {
    requestStatus: TRequestStatus;
  };
  posts: {
    data: Array<TPost>;
    requestStatus: TRequestStatus;
  };
}

const initialState: IHomeState = {
  create: {
    requestStatus: 'sleep',
  },
  posts: {
    data: [],
    requestStatus: 'sleep',
  },
};

export const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    intentFetchPosts: (state) => {
      state.posts.requestStatus = 'loading';
    },
    intentCreatePost: (state, _action: PayloadAction<TSubmitFeedPost>) => {
      state.create.requestStatus = 'loading';
    },
    setPosts: (state, { payload }: PayloadAction<TPost[]>) => {
      state.posts.data = payload;
      state.posts.requestStatus = 'success';
    },
    addPost: (state, { payload }: PayloadAction<TPost>) => {
      state.posts.data.unshift(payload);
      state.create.requestStatus = 'success';
    },
    setPostsRequestStatus: (
      state,
      { payload }: PayloadAction<TRequestStatus>
    ) => {
      state.posts.requestStatus = payload;
    },
    setCreatePostRequestStatus: (
      state,
      { payload }: PayloadAction<TRequestStatus>
    ) => {
      state.create.requestStatus = payload;
    },
  },
});

export const HomeActions = homeSlice.actions;

export const getHomePosts = (state: RootState) => state.home.posts.data;
export const getHomeCreateRequestStatus = (state: RootState) =>
  state.home.create.requestStatus;

export default homeSlice.reducer;
