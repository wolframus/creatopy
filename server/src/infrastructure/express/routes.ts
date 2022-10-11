import { Router } from 'express';

import user from '../../entities/routes/user.router';
import authentication from '../../entities/routes/authentication.router';

type TRoutes = { path: string; handler: Router }[];

const routes: TRoutes = [
  { path: '/user', handler: user },
  { path: '/authentication', handler: authentication },
];

export default routes;
