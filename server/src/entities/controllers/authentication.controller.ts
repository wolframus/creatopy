import {
  TSignUp,
  TIntentResetPassword,
  TSubmitResetPassword,
} from '../types/authentication.types';
import {
  encryptText,
  hashPassword,
  createUserToken,
  generateRandomDigits,
} from '../../utils/functions';
import Queries from '../queries';
import Redis from '../../api/redis';
import UserModel from '../models/user';
import injectRequestTypes from '../../infrastructure/utils/injectRequestTypes';

export const SignUp = injectRequestTypes.post<{}, TSignUp>(async (req, res) => {
  try {
    const { email, password, fullname } = req.headers;

    const user = await Queries.Authentication.SignUp({
      email,
      password,
      fullName: fullname,
    });

    if (!user) {
      throw new Error('User already exists');
    }

    const token = createUserToken(user);
    res.send(token);
  } catch (err: any) {
    console.error('Error: ', err.message);
    res.status(500).send(err.message);
  }
});

export const SignIn = injectRequestTypes.post<{}, TSignUp>(async (req, res) => {
  try {
    const { email, password } = req.headers;

    const user = await Queries.Authentication.SignIn({
      email,
      password,
    });

    if (!user) {
      return res.status(400).send(`User doesn't exists`);
    }

    const token = createUserToken(user);
    res.send(token);
  } catch (err: any) {
    console.error('Error: ', err.message);
    res.status(500).send(err.message);
  }
});

export const IntentResetPassword = injectRequestTypes.post<
  {},
  TIntentResetPassword
>(async (req, res) => {
  try {
    const { email, code } = req.headers;

    const userExists = await UserModel.findOne({ email }).lean();

    if (!userExists) {
      throw new Error("This user doesn't exist");
    }

    const generatedCode = await generateRandomDigits();
    const hashedCode = encryptText(generatedCode);

    const allowReset = await Redis.setResetPasswordCode(email, hashedCode);

    if (!allowReset) {
      throw new Error('Too many attempts');
    }

    const areCodeEqual = 123123 === +code;

    // TODO: EMAIL CODE TO USER

    res.send(areCodeEqual);
  } catch (err: any) {
    console.error('Error: ', err.message);
    res.status(500).send(err.message);
  }
});

export const SubmitResetPassword = injectRequestTypes.post<
  {},
  TSubmitResetPassword
>(async (req, res) => {
  try {
    const { email, code, password } = req.headers;

    const allowSubmitResetPassword = await Redis.allowSubmitResetPassword(
      email
    );

    if (!allowSubmitResetPassword) {
      throw new Error('Too many requests, please try later');
    }

    const areCodeEqual = 123123 === +code;

    if (!areCodeEqual) {
      throw new Error('Something wen wrong');
    }

    const newEncryptedPassword = await hashPassword(password!);
    await UserModel.updateOne({ email }, { password: newEncryptedPassword });

    res.send(true);
  } catch (err: any) {
    console.error('Error: ', err.message);
    res.status(500).send(err.message);
  }
});
