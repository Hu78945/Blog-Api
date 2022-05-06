const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    maxlength: 50,
    minlength: 6,
  },
  password: {
    type: String,
    required: true,
    maxlength: 50,
    minlength: 7,
  },
  profilePic: {
    type: String,
  },
});

module.exports = mongoose.model("user", userSchema);
