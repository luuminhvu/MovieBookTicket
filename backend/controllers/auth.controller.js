const { OAuth2Client } = require("google-auth-library");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const SuccessResponse = require("../common/Response/Success");
const ErrorResponse = require("../common/Response/Error");
const db = require("../config/dbconfig");
const { genAccessToken } = require("../utils/genToken");
const dayjs = require("dayjs");
dotenv.config();
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const verifyTokenGoogle = async (req, res) => {
  try {
    const token = req.body.token;
    if (!token) {
      return ErrorResponse(res, 400, "Missing token");
    }

    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const date = dayjs().format("YYYY-MM-DD");
    const { email, email_verified, name, picture, sub } = payload;
    if (!email_verified) {
      return ErrorResponse(res, 400, "Email not verified");
    }
    const userExistsQuery = `SELECT * FROM user WHERE email = ?`;
    db.query(userExistsQuery, [email], (err, result) => {
      if (err) {
        console.error("Database error:", err.message);
        return ErrorResponse(res, 500, "Internal server error");
      }

      if (result.length > 0) {
        const existingUser = result[0];
        console.log(existingUser);
        const existingToken = genAccessToken({
          userId: existingUser.UserID,
          email: existingUser.Email,
          username: existingUser.Username,
          role: existingUser.Role,
        });
        return SuccessResponse(res, 200, "Login Google Success", {
          token: existingToken,
        });
      }

      const insertQuery =
        "INSERT INTO `user` (userid, username, email, role, avatar, dateregister, active) VALUES ?";
      const values = [[sub, name, email, "customer", picture, date, 1]];

      db.query(insertQuery, [values], (err, result) => {
        if (err) {
          console.error("Database error:", err.message);
          return ErrorResponse(res, 500, "Internal server error");
        }

        const newToken = genAccessToken({
          userId: sub,
          email,
          username: name,
          role: "customer",
        });
        SuccessResponse(res, 200, "Login Google Success", { token: newToken });
      });
    });
  } catch (error) {
    console.error("Error verifying Google token:", error.message);
    ErrorResponse(res, 500, "Internal server error");
  }
};

module.exports = { verifyTokenGoogle };
