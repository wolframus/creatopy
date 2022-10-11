import { NextFunction, Response } from 'express';

import { TRequest } from '../../entities/types/common';

export default {
  get:
    <TParams, TAdditionalHeaders = {}>(
      func: (
        req: { query: TParams } & TRequest<TAdditionalHeaders>,
        res: Response,
        n?: NextFunction
      ) => void
    ) =>
    (request: any, response: Response, next?: NextFunction) =>
      func(request, response, next),

  post:
    <TBody, TAdditionalHeaders = {}, TAdditionalRequest = {}>(
      func: (
        req: { body: TBody } & TRequest<TAdditionalHeaders> &
          TAdditionalRequest,
        res: Response,
        n: NextFunction
      ) => void
    ) =>
    (request: any, response: Response, next: NextFunction) =>
      func(request, response, next),

  delete:
    <TParams>(
      func: (
        req: { params: TParams } & TRequest,
        res: Response,
        n?: NextFunction
      ) => void
    ) =>
    (request: any, response: Response, next?: NextFunction) =>
      func(request, response, next),
};
