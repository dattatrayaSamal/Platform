const mongoose = require("mongoose");
const CommunitySchema = new mongoose.Schema({
  name: String,
  description: String,
  members: { type: Number, default: 0, min: 0 },
});

var Community = (module.exports = mongoose.model(
  "communities",
  CommunitySchema,
  "communities"
));
