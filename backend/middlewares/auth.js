const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const ErrorResponse = require("../common/Response/Error");
dotenv.config();

const auth = async (req, res, next) => {
  const data = req.header("Authorization");
  if (!data) {
    return ErrorResponse(res, 401, "Unauthorized", "No token provided");
  }

  try {
    const token = data.split(" ")[1];
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = decoded;
    next();
  } catch (e) {
    console.error(e);
    ErrorResponse(res, 401, "Unauthorized", "Invalid Token");
  }
};

const authorize = (roles) => {
  return (req, res, next) => {
    auth(req, res, () => {
      if (req.user && roles.includes(req.user.role)) {
        next();
      } else {
        ErrorResponse(
          res,
          403,
          "Forbidden",
          "You do not have permission to access this resource"
        );
      }
    });
  };
};

const isUser = authorize(["customer", "admin"]);
const isAdmin = authorize(["admin"]);

module.exports = { auth, isUser, isAdmin };
