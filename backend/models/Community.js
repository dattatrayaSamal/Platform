const mongoose = require("mongoose");
const CommunitySchema = new mongoose.Schema({
  name: String,
  description: String,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Community", CommunitySchema);
