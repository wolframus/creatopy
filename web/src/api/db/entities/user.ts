import http from '../http';
import { TUser } from '../../../common.types';
import { EMainRoutes, ESecondaryRoutes } from '../types';

export const getMe = () => {
  const url = http.buildPath(EMainRoutes.User, ESecondaryRoutes.GetMe);

  return http.get<TUser>(url);
};
