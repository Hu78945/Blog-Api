const mongoose = require("mongoose");
const refreshTokenSchema = new mongoose.Schema({
  refrehToken: { type: String, required: true },
});
module.exports = mongoose.model("RefreshToekns", refreshTokenSchema);
