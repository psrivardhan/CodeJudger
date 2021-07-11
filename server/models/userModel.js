const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  handle: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String },
  email: { type: String, required: true },
  passwordHash: { type: String },
  score: { type: Number, default: 0 },
  problemsSolved: { type: Number, default: 0 },
  submissions: { type: Array, default: [] },
  problemStatus: { type: Map, of: Boolean },
  admin: { type: Boolean, default: false },
  createdAt: { type: Date, default: new Date() },
});

module.exports = mongoose.model("User", userSchema);
