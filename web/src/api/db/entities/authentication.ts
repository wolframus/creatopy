import http from '../http';
import { EMainRoutes, ESecondaryRoutes } from '../types';
import { encryptEachObjectValue } from '../../../utils/functions';

type TSignIn = {
  email: string;
  password: string;
};

type TSignUp = TSignIn & {
  fullname: string;
};

type TIntentResetPassword = {
  email: string;
  code: string;
};

type TSubmitResetPassword = TIntentResetPassword & {
  code: string;
};

export const signUp = (data: TSignUp) => {
  const url = http.buildPath(
    EMainRoutes.Authentication,
    ESecondaryRoutes.SignUp
  );

  const headers = encryptEachObjectValue(data);

  return http.post<string>(url, undefined, { headers });
};

export const signIn = (data: TSignIn) => {
  const url = http.buildPath(
    EMainRoutes.Authentication,
    ESecondaryRoutes.SignIn
  );

  const headers = encryptEachObjectValue(data);

  return http.post<string>(url, undefined, { headers });
};

export const intentResetPassword = (data: TIntentResetPassword) => {
  const url = http.buildPath(
    EMainRoutes.Authentication,
    ESecondaryRoutes.IntentResetPassword
  );

  const headers = encryptEachObjectValue(data);

  return http.post<boolean>(url, undefined, { headers });
};

export const submitResetPassword = (data: TSubmitResetPassword) => {
  const url = http.buildPath(
    EMainRoutes.Authentication,
    ESecondaryRoutes.SubmitResetPassword
  );

  const headers = encryptEachObjectValue(data);

  return http.post<boolean>(url, undefined, { headers });
};
