import { Router } from 'express';

import user from '../../entities/routes/user.router';
import home from '../../entities/routes/home.router';
import authentication from '../../entities/routes/authentication.router';

type TRoutes = { path: string; handler: Router }[];

const routes: TRoutes = [
  { path: '/user', handler: user },
  { path: '/home', handler: home },
  { path: '/authentication', handler: authentication },
];

export default routes;
