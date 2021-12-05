const errorHandler = (err, req, res, next) => {
  if (err) {
    res.sendStatus(500);
  }

  next();
}

const responceWrapper = async (res, cb) => {
  try {
    await cb();
  } catch(err) {
    res.status(404).send({ message: err.message });
  }
}

module.exports = {
  errorHandler,
  responceWrapper,
};