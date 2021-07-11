const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.json({ message: "Unauthorized" });

    const verified = jwt.verify(token, process.env.JWT_SECRET);

    req.userId = verified.user;
    next();
  } catch (err) {
    res.json({ message: "Unauthorized" });
  }
};

module.exports = auth;
