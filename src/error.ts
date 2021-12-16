import { Response } from "express";

type CallbackType = () => void;

function isErrorMessageObj<T>(obj: T): obj is T & { message: unknown } {
  return obj && 'message' in obj;
}

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