import * as effects from 'redux-saga/effects';

import user from './user';
import auth from './auth';
import signIn from './signIn';
import sighUp from './signUp';
import resetPassword from './resetPassword';

export default function* rootSaga() {
  yield effects.all([sighUp(), auth(), user(), signIn(), resetPassword()]);
}
