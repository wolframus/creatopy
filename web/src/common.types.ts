export type TRequestStatus = 'loading' | 'sleep' | 'error' | 'success';

export type TSignUpRequestPayload = {
  email: string;
  password: string;
  fullName: string;
};

export type TSignInRequestPayload = {
  email: string;
  password: string;
};

export type TSubmitResetPasswordPayload = {
  code: string;
  email: string;
  password: string;
};

export type AwaitedReturnType<T extends (..._args: any[]) => any> = Awaited<
  ReturnType<T>
>;

export type TUser = {
  email: string;
  fullName: string;
};
