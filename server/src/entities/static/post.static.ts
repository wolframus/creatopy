import { TMongoPostPopulated, TPost } from '../../types/models/post';
import { parseDatabaseUser } from './user.static';

export const parseDatabasePost = ({
  _id: id,
  user,
  ...rest
}: TMongoPostPopulated): TPost => ({
  id,
  user: parseDatabaseUser(user),
  ...rest,
});

export const parseDatabasePosts = (data: TMongoPostPopulated[]) =>
  data.map(parseDatabasePost);
