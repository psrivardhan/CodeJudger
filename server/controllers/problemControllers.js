const Problem = require("../models/problemModel.js");
const User = require("../models/userModel.js");
const Submission = require("../models/submissionModel.js");

const compileANDjudge = require("../Judge/compile.js");

// To get all problems data

const getProblems = async (req, res) => {
  const { page, min, max } = req.query;

  try {
    const LIMIT = 10;

    const startIndex = (Number(page) - 1) * LIMIT;

    const total = await Problem.countDocuments({
      score: { $gte: min || 0, $lte: max || 100000 },
    });

    const problems = await Problem.find({
      score: { $gte: min || 0, $lte: max || 100000 },
    })
      .select([
        "-description",
        "-testcasesInput",
        "-testcasesOutput",
        "-submissions",
      ])
      .sort({ createdAt: -1 })
      .limit(LIMIT)
      .skip(startIndex);

    res.status(201).json({ problems, numberOfPages: Math.ceil(total / LIMIT) });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// To get data of a particular problem

const getProblemData = async (req, res) => {
  const { id } = req.params;

  try {
    const problemData = await Problem.findById(id).select([
      "-testcasesInput",
      "-testcasesOutput",
      "-submissions",
    ]);
    res.status(201).json(problemData);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// To get submissions of a particular problem

const getProblemSubmissions = async (req, res) => {
  const { id } = req.params;

  try {
    const problemSubmissions = await Problem.findById(id).select([
      "submissions",
    ]);
    res.status(201).json(problemSubmissions);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// To create a new problem

const createProblem = async (req, res) => {
  const {
    title,
    description,
    score,
    testcasesInput,
    testcasesOutput,
    timeLimit,
    memoryLimit,
  } = req.body;

  if (
    !title ||
    !description ||
    !score ||
    !testcasesInput ||
    !testcasesOutput ||
    !timeLimit ||
    !memoryLimit
  )
    return res.json({ message: "Please Enter all the required fields!" });

  console.log(testcasesInput, testcasesOutput);

  const newProblem = new Problem({
    title,
    description,
    score,
    testcasesInput,
    testcasesOutput,
    timeLimit,
    memoryLimit,
  });

  const savedProblem = await newProblem.save();
  res.status(201).send();
};

// Submission of code wriiten by user

const submitCode = async (req, res) => {
  const userId = req.userId;
  const problemId = req.params.id;
  const { code, language } = req.body;

  if (!code || !language)
    return res.json({ message: "Please Enter all required fields!" });

  let problem;

  try {
    problem = await Problem.findById(problemId);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }

  const {
    testcasesInput,
    testcasesOutput,
    timeLimit,
    memoryLimit,
    score,
    submissionsCount,
  } = problem;

  const problemTitle = problem.title;

  const user = await User.findById(userId);

  const userHandle = user.handle;

  const timeStamp = Math.floor(Date.now() / 1000);

  let returns;
  try {
    returns = await compileANDjudge(
      `${userId}_${timeStamp}`,
      language,
      code,
      timeLimit,
      memoryLimit,
      testcasesInput,
      testcasesOutput
    );
  } catch (e) {
    console.log(e);
  }

  let status = true;
  let verdicts;

  if (returns[0] === 1) status = false;
  else {
    verdicts = returns[1];
    for (let i = 0; i < returns[1].length; i++) {
      if (returns[1][i] !== 4) status = false;
    }
  }

  const newSubmission = new Submission({
    userId,
    userHandle,
    problemId,
    problemTitle,
    language,
    code,
    verdicts,
    status,
  });

  await newSubmission.save();

  const element1 = {
    submissionId: newSubmission._id,
    date: newSubmission.createdAt,
    problemId,
    problemTitle,
    language,
    status,
  };

  const element2 = {
    submissionId: newSubmission._id,
    date: newSubmission.createdAt,
    userId,
    userHandle,
    language,
  };

  user.submissions.push(element1);
  if (status) {
    problem.submissions.push(element2);
    problem.submissionsCount = submissionsCount + 1;
  }

  const prevStatus = user.problemStatus.get(problemId);

  if (!prevStatus) {
    user.problemStatus.set(problemId, status);
    if (status) {
      user.score += problem.score;
      user.problemsSolved += 1;
    }
  }

  await user.save();
  await problem.save();

  res.status(201).json({ verdicts: returns });
};

module.exports = {
  getProblems,
  getProblemData,
  getProblemSubmissions,
  createProblem,
  submitCode,
};
