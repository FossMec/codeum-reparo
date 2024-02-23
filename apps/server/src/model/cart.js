const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        min: 1,
      },
      discount: {
        type: Number,
        default: 0,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  totalPrice: {
    type: Number,
    default: 0,
  },
  promoCodeApplied: {
    type: String,
    default: "",
  },
  promoCodeDiscount: {
    type: Number,
    default: 0,
  },
});

// Pre-save hook to calculate total price
cartSchema.pre("save", async function (next) {
  let totalPrice = 0;
  for (const item of this.items) {
    const product = await mongoose.model("Product").findById(item.productId);
    totalPrice += product.discountPrice * item.quantity - item.discount;
  }
  this.totalPrice = totalPrice;
  next();
});

module.exports = mongoose.model("Cart", cartSchema);
