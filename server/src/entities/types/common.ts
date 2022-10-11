import { TAuthenticationUser } from '../../types/models/user';

export type TRequest<Headers = {}> = {
  headers: Headers;
  user: TAuthenticationUser;
};

export type TFileAndFileNameAndBuffer = File & {
  buffer: any;
  originalname: string;
  mimetype: string;
};
