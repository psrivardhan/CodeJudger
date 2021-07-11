const mongoose = require("mongoose");

const problemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  score: { type: Number, required: true },
  testcasesInput: { type: [String], default: [] },
  testcasesOutput: { type: [String], default: [] },
  timeLimit: { type: Number, required: true },
  memoryLimit: { type: Number, required: true },
  submissions: { type: Array, default: [] },
  submissionsCount: { type: Number, default: 0 },
  createdAt: { type: Date, default: new Date() },
});

module.exports = mongoose.model("Problem", problemSchema);
