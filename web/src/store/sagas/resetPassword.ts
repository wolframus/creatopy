import * as effects from 'redux-saga/effects';
import { SagaReturnType } from 'redux-saga/effects';

import API from '../../api';
import { AwaitedReturnType } from '../../common.types';
import { ResetPasswordActions } from '../reducers/resetPassword';

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

    console.log({ allowReset });

    yield effects.put(ResetPasswordActions.setAllowResetPassword(allowReset));
  } catch (err: any) {
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

    console.log({ submitStatus: status });

    yield effects.put(
      ResetPasswordActions.setRequestStatus(status ? 'success' : 'error')
    );
  } catch (err: any) {
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
