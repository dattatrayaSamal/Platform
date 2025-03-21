const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  userName: String,
  email: String,
  password: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", UserSchema);
