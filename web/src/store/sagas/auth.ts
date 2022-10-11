import * as effects from 'redux-saga/effects';
import { SagaReturnType } from 'redux-saga/effects';

import API from '../../api';
import { AuthActions } from '../reducers/auth';

function* intentAuthenticate(): SagaReturnType<any> {
  try {
    const token: ReturnType<typeof API.LocalStorage.get> = yield effects.call(
      API.LocalStorage.get,
      'token'
    );

    yield effects.put(AuthActions.setToken(token));
  } catch (err: any) {
    yield effects.put(AuthActions.setRequestStatus('error'));
  }
}

function* intentLogOut(): SagaReturnType<any> {
  try {
    yield effects.call(API.LocalStorage.delete, 'token');
    yield effects.call(API.Db.UPDATE_TOKEN);

    yield effects.put(AuthActions.setToken(null));
  } catch (err: any) {
    yield effects.put(AuthActions.setRequestStatus('error'));
  }
}

export default function* root(): SagaReturnType<any> {
  yield effects.all([
    effects.takeLatest(AuthActions.intentLogOut, intentLogOut),
    effects.takeLatest(AuthActions.intentAuthenticate, intentAuthenticate),
  ]);
}
