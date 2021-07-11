const express = require("express");

const router = express.Router();

const { getSubmission } = require("../controllers/submissionControllers.js");

router.get("/:id", getSubmission);

module.exports = router;
