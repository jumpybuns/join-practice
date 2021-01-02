module.exports = (req, res, next) => {
  const err = new Error('Not Found ya Dingus');
  err.status = 404;
  next(err);
};
