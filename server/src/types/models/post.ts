import { Schema } from 'mongoose';

import { TId } from '../common';
import { TMongoUser, TUser } from './user';

export type TPost = {
  id: string;
  user: TUser;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  description: string;
};

export type TMongoPost = Omit<TPost, 'id' | 'user'> &
  TId & {
    user: string | Schema.Types.ObjectId;
  };

export type TMongoPostPopulated = Omit<TPost, 'id' | 'user'> &
  TId & {
    user: TMongoUser;
  };
