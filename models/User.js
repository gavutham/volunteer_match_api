const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
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
    points: {
      type: Number,
      default: 0,
    },
    requests: {
      type: [String],
    },
    tags: {
      type: [String],
    },
    role: {
      type: String,
      required: true,
    },
    events: {
      type: [String],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
