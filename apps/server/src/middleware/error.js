const ErrorHandler = require("../utils/ErrorHandler");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;

  if (err.name === "CastError") {
    const message = `Resource not found. Invalid: ${err.path}`;
    err = new ErrorHandler(404, message);
  }

  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
    err = new ErrorHandler(400, message);
  }

  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map((value) => value.message);
    err = new ErrorHandler(400, message);
  }

  if (err.name === "JsonWebTokenError") {
    const message = "JSON Web Token is invalid. Try again!!!";
    err = new ErrorHandler(400, message);
  }

  if (err.name === "TokenExpiredError") {
    const message = "JSON Web Token is expired. Try again!!!";
    err = new ErrorHandler(400, message);
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });

  if (process.env.NODE_ENV === "DEVELOPMENT") {
    console.log(err);
    console.log(err.stack);
  }

  if (process.env.NODE_ENV === "PRODUCTION") {
    let error = { ...err };
    error.message = err.message;
    console.log(err.message);
  }
};
