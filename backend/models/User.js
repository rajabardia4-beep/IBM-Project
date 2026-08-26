const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },
    googleId: {
    type: String,
    default: null,
},

    emailVerified: {
      type: Boolean,
      default: false,
    },

    emailVerificationOTP: {
      type: String,
      default: null,
    },

    emailVerificationOTPExpires: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;