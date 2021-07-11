const express = require("express");

const router = express.Router();

const {
  getUserData,
  getInfo,
  signin,
  signout,
  signup,
} = require("../controllers/userControllers.js");

const auth = require("../middleware/auth.js");

router.post("/signup", signup);
router.post("/signin", signin);
router.get("/signout", signout);

router.get("/info", auth, getInfo);
router.get("/:id", getUserData);

module.exports = router;
