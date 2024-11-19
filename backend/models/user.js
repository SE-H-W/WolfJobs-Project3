const mongoose = require("mongoose");
const crypto = require("crypto");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    isVerified: {
      type: Boolean,
      default: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      default: "",
    },
    phonenumber: {
      type: String,
      default: "",
    },
    hours: {
      type: String,
      default: "",
    },
    dob: {
      type: Date,
    },
    gender: {
      type: String,
      default: "",
    },
    availability: {
      type: String,
      default: "",
    },
    affiliation: {
      type: String,
      default: "",
    },
    skills: {
      type: String,
      default: "",
    },
    resume: {
      type: String,
      default: "",
    },
    unityId: {
      type: String,
      default: "",
    },
    studentId: {
      type: String,
      default: "",
    },
    resumeId: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: "Resume",
    },
    googleId: {
      type: String,
      unique: true,
      sparse: true, // Allows multiple documents without this field
    },

    avatar: {
      type: String,
      default: "",
    },
    resetPasswordToken: String,
    resetPasswordExpire: String,
  },
  {
    timestamps: true,
  }
);

userSchema.methods.getResetToken = async function () {
  const resetToken = crypto.randomBytes(20).toString("hex");

  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

  return resetToken;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
