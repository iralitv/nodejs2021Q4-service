import { Response } from "express";

type CallbackType = () => void;

const responceWrapper = async (res: Response, cb: CallbackType) => {
  try {
    await cb();
  } catch(err) {
    res.status(404).send({ message: err.message });
  }
}

module.exports = {
  responceWrapper,
};