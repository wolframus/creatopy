import express from 'express';

import {
  TSignIn,
  TSignUp,
  TIntentResetPassword,
  TSubmitResetPassword,
} from '../types/authentication.types';
import { AuthenticationController } from '../controllers';
import middlewares from '../../infrastructure/middlewares';

const Router = express.Router();

Router.post(
  '/sign-up',
  middlewares.formDataParser.parseFields<{
    headers: TSignUp;
  }>({ headers: { decrypt: ['email', 'password', 'fullname'] } }),
  AuthenticationController.SignUp
);

Router.post(
  '/sign-in',
  middlewares.formDataParser.parseFields<{
    headers: TSignIn;
  }>({ headers: { decrypt: ['email', 'password'] } }),
  AuthenticationController.SignIn
);

Router.post(
  '/intent-reset-password',
  middlewares.formDataParser.parseFields<{
    headers: TIntentResetPassword;
  }>({ headers: { decrypt: ['email', 'code'] } }),
  AuthenticationController.IntentResetPassword
);

Router.post(
  '/submit-reset-password',
  middlewares.formDataParser.parseFields<{
    headers: TSubmitResetPassword;
  }>({ headers: { decrypt: ['email', 'password', 'code'] } }),
  AuthenticationController.SubmitResetPassword
);

export default Router;
