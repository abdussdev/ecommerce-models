const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    name: { type: String, trim: true, required: true },
    description: { type: String, trim: true, default: "" },
    price: { type: Number, trim: true, required: true, min: 0 },
    category: { type: String, required: true },
    imageURL: { type: String, default: "" },
    stock: {
      type: Number,
      trim: true,
      required: true,
      min: 0,
      validate: {
        validator: Number.isInteger,
        message: "{VALUE} is not an integer value for stock.",
      },
    },
  },
  { timestamps: true, versionKey: false }
);

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
