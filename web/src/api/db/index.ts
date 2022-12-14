import http from './http';

import * as Home from './entities/home';
import * as User from './entities/user';
import * as Authentication from './entities/authentication';

const UPDATE_TOKEN = () => http.updateToken();

export default {
  UPDATE_TOKEN,
  Home,
  User,
  Authentication,
};
