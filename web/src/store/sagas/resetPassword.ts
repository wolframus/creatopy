import * as effects from 'redux-saga/effects';
import { SagaReturnType } from 'redux-saga/effects';

import API from '../../api';
import { AwaitedReturnType } from '../../common.types';
import { ResetPasswordActions } from '../reducers/resetPassword';
import { ToastActions } from '../reducers/toast';

function* intentSubmit({
  payload,
}: ReturnType<
  typeof ResetPasswordActions['intentSubmit']
>): SagaReturnType<any> {
  try {
    const response: AwaitedReturnType<
      typeof API.Db.Authentication.intentResetPassword
    > = yield effects.call(API.Db.Authentication.intentResetPassword, payload);

    const allowReset = response.data;

    yield effects.put(ResetPasswordActions.setAllowResetPassword(allowReset));
    if (!allowReset) {
      yield effects.put(
        ToastActions.showToast({
          type: 'error',
          title: 'Reset password',
          description: 'Too many attempts. Try later!',
        })
      );
    }
  } catch (err: any) {
    yield effects.put(
      ToastActions.showToast({
        type: 'error',
        title: 'Reset password',
        description: 'An error occurred on password reset',
      })
    );
    yield effects.put(ResetPasswordActions.setRequestStatus('error'));
  }
}

function* submitResetPassword({
  payload,
}: ReturnType<
  typeof ResetPasswordActions['submitResetPassword']
>): SagaReturnType<any> {
  try {
    const response: AwaitedReturnType<
      typeof API.Db.Authentication.submitResetPassword
    > = yield effects.call(API.Db.Authentication.submitResetPassword, payload);

    const status = response.data;

    yield effects.put(
      ResetPasswordActions.setRequestStatus(status ? 'success' : 'error')
    );
    yield effects.put(
      ToastActions.showToast({
        type: 'success',
        title: 'Password change',
        description: 'Your password has been successfully changed',
      })
    );
    if (status) {
      yield effects.delay(0);
      yield effects.put(ResetPasswordActions.setRequestStatus('sleep'));
    }
  } catch (err: any) {
    yield effects.put(
      ToastActions.showToast({
        type: 'error',
        title: 'Password change',
        description: 'Too many attempts',
      })
    );
    yield effects.put(ResetPasswordActions.setRequestStatus('error'));
  }
}

export default function* root(): SagaReturnType<any> {
  yield effects.all([
    effects.takeLatest(ResetPasswordActions.intentSubmit, intentSubmit),
    effects.takeLatest(
      ResetPasswordActions.submitResetPassword,
      submitResetPassword
    ),
  ]);
}
