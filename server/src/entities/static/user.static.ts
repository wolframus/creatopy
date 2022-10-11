import { TMongoUser, TUser } from '../../types/models/user';

export const parseDatabaseUser = ({ _id: id, ...rest }: TMongoUser): TUser => ({
  id,
  ...rest,
});
