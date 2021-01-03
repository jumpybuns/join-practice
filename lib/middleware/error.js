module.exports = (err, req, res, next) => {
  const status = err.status || 404;
  res.status(status);
  console.log(err);
  res.send({
    message: err.message
  });
};
