import * as effects from 'redux-saga/effects';
import { SagaReturnType } from 'redux-saga/effects';

import API from '../../api';
import { AuthActions } from '../reducers/auth';
import { ToastActions } from '../reducers/toast';
import { SignInActions } from '../reducers/signIn';
import { AwaitedReturnType } from '../../common.types';

function* intentSubmit({
  payload,
}: ReturnType<typeof SignInActions['intentSubmit']>): SagaReturnType<any> {
  try {
    const response: AwaitedReturnType<typeof API.Db.Authentication.signIn> =
      yield effects.call(API.Db.Authentication.signIn, payload);

    const token = response.data;

    yield effects.call(API.LocalStorage.set, 'token', token);

    yield effects.put(AuthActions.setToken(token));
  } catch (err: any) {
    yield effects.put(
      ToastActions.showToast({
        type: 'error',
        title: 'Sign In',
        description: 'Error occurred on sign in intent',
      })
    );
    yield effects.put(AuthActions.setRequestStatus('error'));
  }
}

export default function* root(): SagaReturnType<any> {
  yield effects.all([
    effects.takeLatest(SignInActions.intentSubmit, intentSubmit),
  ]);
}
