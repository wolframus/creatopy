import { cpus } from 'os';
import cluster from 'cluster';
import express from 'express';

import { routes, middlewares } from './infrastructure/express';
import Mongo from './api/mongoose';

const PORT = 4000;
const numCpus = cpus().length;

Mongo.connect();

if (cluster.isPrimary) {
  for (let i = 0; i < numCpus; i += 1) {
    cluster.fork();
  }
} else {
  const app = express();

  middlewares.forEach((middleware: any) => app.use(middleware));
  routes.forEach((route) => app.use(route.path, route.handler));

  app.listen(PORT, () =>
    console.info(`Process ID ${process.pid} is listening on port: ${PORT}`)
  );
}
