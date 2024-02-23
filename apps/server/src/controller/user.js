const express = require("express");
const path = require("path");
const router = express.Router();
const User = require("../model/user");
const Cart = require("../model/cart");
const Product = require("../model/product");
const sendToken = require("../utils/jwtToken");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/ErrorHandler");
const { isAuthenticated } = require("../middleware/auth");
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
      console.log("user", user);

      sendToken(user, 201, res);
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

//add product to cart
router.post(
  "/add-to-cart",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      console.log("req.body", req.body);
      const { productId, quantity, discount } = req.body;
      const user = await User.findById(req.user.id);
      const product = await Product.findById(productId);
      if (!product) {
        return next(new ErrorHandler("Product not found", 404));
      }
      let cart = await Cart.findOne({ userId: req.user.id });
      if (cart) {
        let item = cart.items.find((i) => i.productId == productId);
        if (item) {
          item.quantity = item.quantity + quantity;
          item.discount = discount;
          cart.items = cart.items;
        } else {
          cart.items.push({ productId, quantity, discount });
        }
        cart.totalPrice = cart.totalPrice + quantity * product.discountPrice;
        cart = await cart.save({ validateBeforeSave: false });
        res.status(200).json({
          success: true,
          cart,
        });
      } else {
        const newCart = await Cart.create({
          userId: req.user.id,
          items: [{ productId, quantity, discount }],
          totalPrice: quantity * product.discountPrice,
        });
        res.status(200).json({
          success: true,
          newCart,
        });
      }
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);
//get cart items
router.get(
  "/get-cart-items",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const cart = await Cart.findOne({ userId: req.user.id });
      if (!cart) {
        return next(new ErrorHandler("Cart not found", 404));
      }
      res.status(200).json({
        success: true,
        cart,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);
//delete cart item
router.delete(
  "/delete-cart-item/:id",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const cart = await Cart.findOne({ userId: req.user.id });
      if (!cart) {
        return next(new ErrorHandler("Cart not found", 404));
      }
      const item = cart.items.find((i) => i._id == req.params.id);
      if (!item) {
        return next(new ErrorHandler("Item not found", 404));
      }
      cart.items = cart.items.filter((i) => i._id != req.params.id);
      cart.totalPrice = cart.totalPrice - item.quantity * item.discount;
      await cart.save({ validateBeforeSave: false });
      res.status(200).json({
        success: true,
        cart,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

router.get(
  User,
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const users = await User.findById(req.user.id);
      if (!users) {
        return next(new ErrorHandler("User not found", 404));
      }
      res.status(200).json({
        success: true,
        users,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

module.exports = router;
