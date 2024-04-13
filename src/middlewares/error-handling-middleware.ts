import type { NextFunction, Request, Response } from 'express';
import log from '../logger/index';
import CustomError from '../error/custom-error';

export default (
  err: Error | CustomError,
  req: Request,
  res: Response,
  _next: NextFunction
): void => {
  log.error(
    `URL-${req.url} | METHOD-${req.method} | BODY-${JSON.stringify(
      req.body
    )} | QUERY-${JSON.stringify(req.query)} | ERR MESSAGE-${err.message}`
  );
  log.error(err.stack);
  const status: number = err instanceof CustomError ? err.status : 500;
  const errorMessage: string = err.message ?? 'Unexpecting Error';

  res.status(status).json({ error: errorMessage });
};
