const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const genAccessToken = (user) => {
  const accessKey = process.env.ACCESS_TOKEN_SECRET;
  const token = jwt.sign(
    {
      username: user.username,
      email: user.email,
      role: user.role,
    },
    accessKey,
    { expiresIn: "5d" }
  );
  return token;
};
const genRefreshToken = (user) => {
  const refreshKey = process.env.REFRESH_TOKEN_SECRET;
  const token = jwt.sign(
    {
      username: user.username,
      email: user.email,
      role: user.role,
    },
    refreshKey,
    { expiresIn: "365d" }
  );
  return token;
};
module.exports = { genAccessToken, genRefreshToken };
