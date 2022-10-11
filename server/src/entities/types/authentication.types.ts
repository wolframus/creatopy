export type TSignIn = {
  email: string;
  password: string;
};

export type TSignUp = TSignIn & {
  fullname: string;
};

export type TIntentResetPassword = {
  email: string;
  code: string;
};

export type TSubmitResetPassword = TIntentResetPassword & {
  password: string;
};
