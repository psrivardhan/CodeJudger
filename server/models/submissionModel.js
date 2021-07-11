const mongoose = require("mongoose");

const submissionSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  userHandle: { type: String, required: true },
  problemId: { type: String, required: true },
  problemTitle: { type: String, required: true },
  language: { type: Number, required: true },
  code: String,
  verdicts: { type: [Number], default: [] },
  status: { type: Boolean, required: true },
  createdAt: { type: Date, default: new Date() },
});

module.exports = mongoose.model("Submission", submissionSchema);
