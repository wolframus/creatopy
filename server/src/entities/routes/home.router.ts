import express from 'express';

import { HomeController } from '../controllers';
import middlewares from '../../infrastructure/middlewares';

const Router = express.Router();

Router.get(
  '/posts',
  middlewares.authentication.userAuthentication,
  HomeController.GetPosts
);

Router.post(
  '/',
  middlewares.authentication.userAuthentication,
  HomeController.PublishPost
);

export default Router;
