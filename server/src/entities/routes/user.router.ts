import express from 'express';

import { UserController } from '../controllers';
import middlewares from '../../infrastructure/middlewares';

const Router = express.Router();

Router.get(
  '/get-me',
  middlewares.authentication.userAuthentication,
  UserController.GetMe
);

export default Router;
