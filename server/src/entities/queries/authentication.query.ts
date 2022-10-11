import UserModel from '../models/user';
import { doesPasswordMatch, hashPassword } from '../../utils/functions';

export const SignUp = async ({
  email,
  fullName,
  password,
}: {
  email: string;
  fullName: string;
  password: string;
}) => {
  const existingUser = await UserModel.findOne({ email }).lean();

  if (existingUser) {
    return false;
  }

  const hashedPassword = await hashPassword(password);
  const createdUser = await UserModel.create({
    email,
    fullName,
    password: hashedPassword,
  });

  const parsedCreatedUser = UserModel.parseDatabaseUser(createdUser);
  return parsedCreatedUser;
};

export const SignIn = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const user = await UserModel.findOne({ email }).lean();

  if (!user?.password) {
    return false;
  }

  const passwordMatch = await doesPasswordMatch(password, user.password);

  if (!passwordMatch) {
    return false;
  }

  const parsedUser = UserModel.parseDatabaseUser(user);
  return parsedUser;
};
