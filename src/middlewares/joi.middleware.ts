import Joi from 'joi';
import CustomError from '../error/custom-error';
import type { Request, Response, NextFunction } from 'express';

export interface IJoiValidationObject {
  body?: any;
  query?: any;
  params?: any;
  status?: any;
}

export const joiMiddleware =
  ({ body, params, query, status }: IJoiValidationObject) =>
  async (req: Request, _res: Response, next: NextFunction) => {
    try {
      if (body) await Joi.object(body as object).validateAsync(req.body);
      if (query) await Joi.object(query as object).validateAsync(req.query);
      if (params) await Joi.object(params as object).validateAsync(req.params);

      next();
    } catch (err: any) {
      const error = new CustomError({
        message: err.details?.length ? err.details[0]?.message : err.message,
        status,
      });
      next(error);
    }
  };
