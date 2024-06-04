const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const genAccessToken = (user) => {
  const accessKey = process.env.ACCESS_TOKEN_SECRET;
  const token = jwt.sign(
    {
      userId: user.userId,
      username: user.username,
      email: user.email,
      role: user.role,
      authType: user.authType,
      active: user.active,
    },
    accessKey,
    { expiresIn: "1d" }
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
