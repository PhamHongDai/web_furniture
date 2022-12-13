const mongoose = require("mongoose");
variantSchema = require("../models/variant").schema;

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    price: {
      type: Number,
      required: true,
    },
    discountPercent: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
      required: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    productPictures: [{ type: String }],
    reviews: [
      {
        rating: { type: Number, required: true },
        comment: { type: String, required: true },
        user: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "User",
        },
        createdAt: { type: Date, default: Date.now },
      },
    ],
    variants: [
      {
        name: {type: String, required: true},
        quantity: {type: Number, required: true},
      }
    ],
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    isDisabled:{
        type : Boolean,
        default :false
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
