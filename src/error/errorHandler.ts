import { Request, Response, NextFunction, Errback } from 'express';
import { logger } from '../logger';
import ApiError from "./ApiError";

export const apiErrorHandler = (err: Errback, req: Request, res: Response, next: NextFunction) => {
  logger.error(`apiErrorHandler: ${JSON.stringify(err)}`)

  if ( err instanceof ApiError ) {
    logger.error(`apiErrorHandler: ${JSON.stringify(err)}`)
    res.status(err.code).json({ message: err.message });
    return;
  }

  res.status(500).json({ message: 'something went wrong' });
};

type CallbackType = () => void;

/**
 * Returns status of existing a message prop in Error object
 * @param obj error obj unknown
 * @returns value of existing a message prop in Error obj boolean
 */
const isErrorMessageObj = <T>(obj: T): obj is T & { message: unknown } => obj && 'message' in obj

/**
 * Execute callback function or Return response with 404 status
 * @param res response of query Response
 * @param cb executing callback function CallbackType
 * @returns void
 */
export const responceWrapper = async (res: Response, cb: CallbackType) => {
  try {
    await cb();
  } catch(err) {
    if (isErrorMessageObj(err)) {
      logger.error(`responceWrapper: ${JSON.stringify(err)}`)
      res.status(404).send({ message: err.message });
    }
  }
}
