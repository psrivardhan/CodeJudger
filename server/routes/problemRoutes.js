const express = require("express");
const auth = require("../middleware/auth.js");

const router = express.Router();

const {
  getProblems,
  getProblemData,
  createProblem,
  submitCode,
  getProblemSubmissions,
} = require("../controllers/problemControllers.js");

router.get("/", getProblems);
router.get("/:id", getProblemData);
router.get("/:id/submissions", getProblemSubmissions);

router.post("/create", auth, createProblem);
router.post("/:id/submit", auth, submitCode);

module.exports = router;
