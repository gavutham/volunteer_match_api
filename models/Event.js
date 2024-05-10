const mongoose = require("mongoose");

const EventSchema = mongoose.Schema(
  {
    uid: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    tags: {
      type: [String],
      required: true,
    },
    time: {
      type: Number,
      required: true,
    },
    opted: {
      type: [String],
      required: true,
    },
    limit: {
      type: Number,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    points: {
      type: Number,
      required: true,
    },
    completed: {
      type: Boolean,
      default: false,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Event", EventSchema);
