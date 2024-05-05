const crypto = require("crypto");
const genActivationToken = () => {
  const token = crypto.randomBytes(64).toString("hex");
  return token;
};
module.exports = genActivationToken;
