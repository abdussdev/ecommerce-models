const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    totalAmount: { type: Number, required: true, min: 0 },
    shippingAddress: { type: String, required: true },
    status: { type: String, required: true, default: "Pending" },
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
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
    ],
  },
  { timestamps: true, versionKey: false }
);

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
