require("dotenv").config();
const jwt = require("jsonwebtoken");
const accessTokenSecret = process.env.ACCESSTOKENSECRET;

const authenticateJWT = (req, res, next) => {
  const token = req.signedCookies["session"];
  if (token) {
    jwt.verify(token, accessTokenSecret, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = user;
      next();
    });
  } else {
    return res.sendStatus(401);
  }
};

module.exports = authenticateJWT;
