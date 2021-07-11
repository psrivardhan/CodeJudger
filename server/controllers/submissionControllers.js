const Submission = require("../models/submissionModel.js");

const getSubmission = async (req, res) => {
  const { id } = req.params;
  try {
    const submission = await Submission.findById(id);
    res.status(201).json(submission);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports = { getSubmission };
