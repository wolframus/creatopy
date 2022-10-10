import { verifyUserToken } from '../../utils/functions';

export const userAuthentication = async (req: any, res: any, next: any) => {
  const token = req.headers.authorization;

  try {
    const user = verifyUserToken(token);

    req.user = user;

    delete req.headers.authorization;

    next();
  } catch (err: any) {
    res.status(401).send('Not authenticated');
  }
};
