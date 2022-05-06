const jwt = require("jsonwebtoken");
require("dotenv").config();

//authenticate  the token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
      if (err) {
        res.status(403).json("Token is invalid");
      }
      req.user = user;
      next();
    });
  } else {
    res.status(401).json("You are not authenticated");
  }
};

//genrate the access token
const GenrateAcessToken = (user) => {
  return jwt.sign(
    { username: user.username, id: user._id },
    process.env.TOKEN_SECRET,
    { expiresIn: "30m" }
  );
};
module.exports = { authenticateToken, GenrateAcessToken };
