import express from 'express';

import { AuthenticationController } from '../controllers';
import middlewares from '../../infrastructure/middlewares';

const Router = express.Router();

Router.get(
  '/sign-up',
  middlewares.authentication.userAuthentication,
  AuthenticationController.SignUp
);

export default Router;
