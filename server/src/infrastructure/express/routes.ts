import { Router } from 'express';

import authentication from '../../entities/routes/authentication.router';

type TRoutes = { path: string; handler: Router }[];

const routes: TRoutes = [{ path: '/authentication', handler: authentication }];

export default routes;
