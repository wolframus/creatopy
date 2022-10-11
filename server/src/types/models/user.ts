import { TId } from '../common';

export type TUser = {
  id: string;
  email: string;
  fullName: string;
};

export type TMongoUser = Omit<TUser, 'id'> &
  TId & {
    password?: string | null;
  };

export type TAuthenticationUser = Omit<TMongoUser, '_id' | 'password'> & {
  id: string;
};
