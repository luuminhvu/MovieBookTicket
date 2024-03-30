const db = require("../config/dbconfig");
const bcrypt = require("bcrypt");
const { genAccessToken } = require("../utils/genToken");
const SuccessResponse = require("../common/Response/Success");
const ErrorResponse = require("../common/Response/Error");
const { generateBookingId } = require("../common/fn/GenerateNumber");
const register = async (req, res) => {
  try {
    const q = "SELECT * FROM `user` WHERE email = ? OR username = ?";
    const data = await new Promise((resolve, reject) => {
      db.query(q, [req.body.email, req.body.username], (err, data) => {
        if (err) return ErrorResponse(res, 500, "Internal Server Error");
        console.log(data);
        resolve(data);
      });
    });

    if (data.length > 0) {
      return ErrorResponse(res, 400, "User already exists");
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);
    const UserID = generateBookingId(10);
    const insertQuery =
      "INSERT INTO `user` (userid, username, password, email, role) VALUES ?";
    const values = [
      [UserID, req.body.username, hashedPassword, req.body.email, "customer"],
    ];

    await new Promise((resolve, reject) => {
      db.query(insertQuery, [values], (err, data) => {
        if (err) return ErrorResponse(res, 500, "Internal Server Error");
        resolve();
      });
    });

    const user = {
      userId: UserID,
      username: req.body.username,
      email: req.body.email,
      role: "customer",
    };
    const token = genAccessToken(user);
    SuccessResponse(res, 200, "User registered successfully", token);
  } catch (error) {
    ErrorResponse(res, 500, "Internal Server Error");
  }
};

const login = async (req, res) => {
  try {
    const q = "SELECT * FROM `user` WHERE email = ?";
    const data = await new Promise((resolve, reject) => {
      db.query(q, [req.body.email], (err, data) => {
        if (err) return ErrorResponse(res, 500, "Internal Server Error");
        resolve(data);
      });
    });

    if (data.length === 0) {
      return ErrorResponse(res, 400, "Email or password is incorrect");
    }

    const user = data[0];
    const validPassword = bcrypt.compareSync(req.body.password, user.Password);
    if (!validPassword) {
      return ErrorResponse(res, 400, "Invalid password");
    }
    const newUser = {
      userId: user.UserID,
      username: user.Username,
      email: user.Email,
      role: user.Role,
    };

    const token = genAccessToken(newUser);
    SuccessResponse(res, 200, "User logged in successfully", token);
  } catch (error) {
    ErrorResponse(res, 500, "Internal Server Error");
    console.log(error);
  }
};
const getUserInfo = async (req, res, next) => {
  try {
    const UserID = req.body.UserID;
    const q = `SELECT * FROM user WHERE UserID = ${UserID}`;
    const data = await new Promise((resolve, reject) => {
      db.query(q, (err, data) => {
        if (err) return ErrorResponse(res, 500, "Internal Server Error", err);
        resolve(data);
      });
    });
    SuccessResponse(res, 200, "User info fetched successfully", data[0]);
  } catch (error) {
    ErrorResponse(res, 500, "Internal Server Error");
  }
};

module.exports = { register, login, getUserInfo };
