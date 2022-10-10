import jwt from 'jsonwebtoken';

import CONFIG from '../config';

export const verifyUserToken = (token: string) =>
  jwt.verify(token, CONFIG.TOKEN_SECRET_KEY);
