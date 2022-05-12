const mongoose = require("mongoose");
const refreshTokenSchema = new mongoose.Schema({
  refrehToken: { type: String, required: true },
  createdAt: { type: Date, expires: 3600, default: Date.now },
});
module.exports = mongoose.model("RefreshToekns", refreshTokenSchema);
