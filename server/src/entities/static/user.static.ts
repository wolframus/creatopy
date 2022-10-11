import { TMongoUser, TUser } from '../../types/models/user';

export const parseDatabaseUser = ({
  _id: id,
  password,
  ...rest
}: TMongoUser): TUser => ({
  id,
  ...rest,
});
