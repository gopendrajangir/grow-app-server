module.exports = (err, req, res, next) => {
  console.log(err);

  err.status = err.status || 'error';
  err.statusCode = err.statusCode || 500;

  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    res.status(err.statusCode).json({
      status: err.status,
      message: 'Something went wrong',
    });
  }
};
