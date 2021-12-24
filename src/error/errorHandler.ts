import { Request, Response, NextFunction, Errback } from 'express';
import { logger } from '../logger';
import ApiError from "./ApiError";

export const apiErrorHandler = (err: Errback, req: Request, res: Response, next: NextFunction) => {
  logger.error(`apiErrorHandler: ${JSON.stringify(err)}`)

  if ( err instanceof ApiError ) {
    res.status(err.code).json({ message: err.message });
    return;
  }

  res.status(500).json({ message: 'something went wrong' });
};
