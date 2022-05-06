const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      maxlength: 45,
      minlength: 10,
    },
    desc: {
      type: String,
      required: true,
      maxlength: 500,
      minlength: 10,
    },
    img: {
      type: String,
      required: true,
    },
    pin: {
      type: Number,
      maxlength: 4,
      minlength: 4,
    },
    author: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("blogs", BlogSchema);
