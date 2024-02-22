const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = (func) => (req, res, next) => {
  Promise.resolve(func(req, res, next)).catch(next);
};
const jwt = require("jsonwebtoken");
