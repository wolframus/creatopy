import * as effects from 'redux-saga/effects';
import { SagaReturnType } from 'redux-saga/effects';

import API from '../../api/index';
import { UserActions } from '../reducers/user';
import { AwaitedReturnType } from '../../common.types';

function* intentFetchUserData(): SagaReturnType<any> {
  try {
    const response: AwaitedReturnType<typeof API.Db.User.getMe> =
      yield effects.call(API.Db.User.getMe);

    const data = response.data;

    yield effects.put(UserActions.setUserData(data));
  } catch (err: any) {
    yield effects.put(UserActions.setRequestStatus('error'));
  }
}

export default function* root(): SagaReturnType<any> {
  yield effects.all([
    effects.takeLatest(UserActions.intentFetchUserData, intentFetchUserData),
  ]);
}
