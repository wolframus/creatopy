import * as effects from 'redux-saga/effects';

import user from './user';
import home from './home';
import auth from './auth';
import signIn from './signIn';
import sighUp from './signUp';
import resetPassword from './resetPassword';

export default function* rootSaga() {
  yield effects.all([
    home(),
    auth(),
    user(),
    sighUp(),
    signIn(),
    resetPassword(),
  ]);
}
