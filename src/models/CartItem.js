const mongoose = require("mongoose");

const cartItemSchema = mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: {
      type: Number,
      required: true,
      min: 1,
      validate: {
        validator: Number.isInteger,
        message: "{VALUE} is not a valid integer value for quantity.",
      },
    },
  },
  { timestamps: true, versionKey: false }
);

const CartItem = mongoose.model("CartItem", cartItemSchema);
module.exports = CartItem;
