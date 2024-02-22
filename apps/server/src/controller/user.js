const express = require("express");
const path = require("path");
const router = express.Router();
const User = require("../model/user");
const sendToken = require("../utils/jwtToken");
const ErrorHandler = require("../utils/ErrorHandler");
router.post("/create-user", async (req, res, next) => {
  const { name, email, password } = req.body;
  console.log("name", name);

  const userEmail = await User.findOne({ email });
  if (userEmail) {
    return next(new ErrorHandler("Email already exists", 400));
  }
  const user = await User.create({
    name,
    email,
    password,
  });
  const token = user.getJwtToken();
  res.status(201).json({
    success: true,
    token,
  });
});
router.post(
  "/login-user",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return next(new ErrorHandler("Please provide the all fields!", 400));
      }

      const user = await User.findOne({ email }).select("+password");

      if (!user) {
        return next(new ErrorHandler("User doesn't exists!", 400));
      }

      const isPasswordValid = await user.comparePassword(password);

      if (!isPasswordValid) {
        return next(
          new ErrorHandler("Please provide the correct information", 400)
        );
      }

      sendToken(user, 201, res);
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

module.exports = router;
