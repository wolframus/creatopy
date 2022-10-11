import * as effects from 'redux-saga/effects';
import { SagaReturnType } from 'redux-saga/effects';

import API from '../../api/index';
import { SignUpActions } from '../reducers/signUp';
import { AwaitedReturnType } from '../../common.types';
import { ToastActions } from '../reducers/toast';

function* intentSubmit({
  payload,
}: ReturnType<typeof SignUpActions['intentSubmit']>): SagaReturnType<any> {
  try {
    const { email, password, fullName } = payload;
    const response: AwaitedReturnType<typeof API.Db.Authentication.signUp> =
      yield effects.call(API.Db.Authentication.signUp, {
        email,
        password,
        fullname: fullName,
      });

    const token = response.data;

    yield effects.call(API.LocalStorage.set, 'token', token);
    yield effects.put(SignUpActions.setSignUpStatus('success'));
  } catch (err: any) {
    yield effects.put(
      ToastActions.showToast({
        type: 'error',
        title: 'Sign Up',
        description: 'And error occurred on signing up',
      })
    );
    yield effects.put(SignUpActions.setSignUpStatus('error'));
  }
}

export default function* root(): SagaReturnType<any> {
  yield effects.all([
    effects.takeLatest(SignUpActions.intentSubmit, intentSubmit),
  ]);
}
