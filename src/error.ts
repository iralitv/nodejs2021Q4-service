import { Response } from "express";

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
const responceWrapper = async (res: Response, cb: CallbackType) => {
  try {
    await cb();
  } catch(err) {
    if (isErrorMessageObj(err)) {
      res.status(404).send({ message: err.message });
    }
  }
}

module.exports = {
  responceWrapper,
};