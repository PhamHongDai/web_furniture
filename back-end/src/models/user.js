const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
    },
    phoneNumber: {
      type: String,
      trim: true,
      unique: true,
      lowercase: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    profilePicture: {
      type: String,
      default:
        "https://cachtrongrausach.vn/this-page-isn-t-working/imager_2_16115_700.jpg",
    },

    isDisabled: false,
  },
  { timestamps: true }
);

userSchema.methods = {
  authenticate: async function (password) {
    return await bcrypt.compare(password, this.password);
  },
};
module.exports = mongoose.model("User", userSchema);
