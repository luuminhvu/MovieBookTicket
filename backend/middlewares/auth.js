const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const ErrorResponse = require("../common/Response/Error");
dotenv.config();

const auth = async (req, res, next) => {
  const data = req.header("Authorization");
  if (!data) {
    ErrorResponse(res, 401, "Unauthorized", "No token provided");
  } else {
    try {
      const token = data.split(" ")[1];
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      req.user = decoded;
      console.log(decoded);
      next();
    } catch (e) {
      console.error(e);
      ErrorResponse(res, 500, "Internal Server Error", "Invalid Token");
    }
  }
};

const isUser = (req, res, next) => {
  auth(req, res, () => {
    if (
      (req.user && req.user.role === "customer") ||
      req.user.role === "admin"
    ) {
      next();
    } else {
      ErrorResponse(res, 401, "Unauthorized", "You are not a user");
    }
  });
};

const isAdmin = (req, res, next) => {
  auth(req, res, () => {
    if (req.user && req.user.role === "admin") {
      next();
    } else {
      ErrorResponse(res, 401, "Unauthorized", "You are not an admin");
    }
  });
};

module.exports = { auth, isUser, isAdmin };
