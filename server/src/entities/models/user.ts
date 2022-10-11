import { Model, model, Schema } from 'mongoose';

import { TMongoUser } from '../../types/models/user';
import { parseDatabaseUser } from '../static/user.static';

interface UserModelOverride extends Model<TMongoUser> {
  parseDatabaseUser: typeof parseDatabaseUser;
}

const UserSchema = new Schema<TMongoUser, UserModelOverride>({
  email: { type: String, required: true },
  fullName: { type: String, required: true },
  password: { type: String, required: true },
});

UserSchema.static('parseDatabaseUser', parseDatabaseUser);

const UserModel = model<TMongoUser, UserModelOverride>('TestUser', UserSchema);

export default UserModel;
