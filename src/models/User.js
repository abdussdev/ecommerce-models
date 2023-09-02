const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    address: { type: String, default: "" },
    phoneNumber: { type: String, default: "" },
  },
  { timestamps: true, versionKey: false }
);

userSchema.virtual("cartItems", {
  ref: "CartItem",
  localField: "_id",
  foreignField: "user",
});

userSchema.virtual("orders", {
  ref: "Order",
  localField: "_id",
  foreignField: "user",
});

userSchema.pre("remove", async function (next) {
  const CartItem = require("./CartItem");
  const Order = require("./Order");

  await CartItem.deleteMany({ user: this._id });
  await Order.deleteMany({ user: this._id });

  next();
});

const User = mongoose.model("User", userSchema);
module.exports = User;
