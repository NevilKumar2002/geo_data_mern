const jwt = require("jsonwebtoken");
require("dotenv").config();

const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (token) {
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        res.status(401).send({ msg: "You are not authorized" });
      } else {
        req.body.userId = decoded.userId;
        next();
      }
    });
  } else {
    res.status(401).send({ msg: "You are not authorized" });
  }
};

module.exports = { auth };
