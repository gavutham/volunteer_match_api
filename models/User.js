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
    role: {
      type: String,
      required: true,
    },
    tags: {
      type: [String],
    },
    events: {
      type: [String],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
