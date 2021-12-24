import { Request, Response, NextFunction, Errback } from 'express';
import { logger } from '../logger';
import ApiError from "./ApiError";

type CallbackType = () => void;

/**
 * Returns status of existing a message prop in Error object
 * @param obj error obj unknown
 * @returns value of existing a message prop in Error obj boolean
 */
const isErrorMessageObj = <T>(obj: T): obj is T & { message: unknown, code: unknown } => obj && 'message' in obj && 'code' in obj

export const apiErrorHandler = (err: Errback, req: Request, res: Response, next: NextFunction) => {
  if (isErrorMessageObj(err)) {
    logger.error(`error: status ${err.code} - ${err.message}`);
  }

  if ( err instanceof ApiError ) {
    res.status(err.code).json({ message: err.message });
    return;
  }

  res.status(500).json({ message: 'something went wrong' });
};

/**
 * Execute callback function or Return response with 404 status
 * @param res response of query Response
 * @param cb executing callback function CallbackType
 * @returns void
 */
export const responceWrapper = async (res: Response, req: Request, cb: CallbackType) => {
  try {
    logger.info(`request: url: ${req.url} params: ${JSON.stringify(req.params)} body: ${JSON.stringify(req.body)} - response code: ${res.statusCode}`)
    await cb();
  } catch(err) {
    if (isErrorMessageObj(err)) {
      logger.error(`Unhandled Rejections Error: ${JSON.stringify(err)}`)
      res.status(404).send({ message: err.message });
    }
  }
}
