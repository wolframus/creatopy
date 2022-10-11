import * as effects from 'redux-saga/effects';
import { SagaReturnType } from 'redux-saga/effects';

import API from '../../api';
import { HomeActions } from '../reducers/home';
import { ToastActions } from '../reducers/toast';
import { AwaitedReturnType } from '../../common.types';

function* intentCreatePost({
  payload,
}: ReturnType<typeof HomeActions['intentCreatePost']>): SagaReturnType<any> {
  try {
    const response: AwaitedReturnType<typeof API.Db.Home.publishPost> =
      yield effects.call(API.Db.Home.publishPost, payload);
    const createdPost = response.data;
    yield effects.put(HomeActions.addPost(createdPost));

    yield effects.put(
      ToastActions.showToast({
        type: 'success',
        title: 'Post creation',
        description: 'Your post has been successfully created',
      })
    );
  } catch (err: any) {
    yield effects.put(
      ToastActions.showToast({
        type: 'error',
        title: 'Post creation',
        description: 'Error occurred on post creation',
      })
    );
    yield effects.put(HomeActions.setCreatePostRequestStatus('error'));
  }
}

function* intentFetchPosts(): SagaReturnType<any> {
  try {
    const response: AwaitedReturnType<typeof API.Db.Home.getHomePosts> =
      yield effects.call(API.Db.Home.getHomePosts);
    const posts = response.data;
    yield effects.put(HomeActions.setPosts(posts));
  } catch (err: any) {
    yield effects.put(HomeActions.setPostsRequestStatus('error'));
  }
}

export default function* root(): SagaReturnType<any> {
  yield effects.all([
    effects.takeLatest(HomeActions.intentCreatePost, intentCreatePost),
    effects.takeLatest(HomeActions.intentFetchPosts, intentFetchPosts),
  ]);
}
