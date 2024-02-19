const db = require("../config/dbconfig");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SuccessResponse = require("../common/Response/Success");
const ErrorResponse = require("../common/Response/Error");
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

    const insertQuery =
      "INSERT INTO `user` (username, password, email, role) VALUES ?";
    const values = [
      [req.body.username, hashedPassword, req.body.email, "customer"],
    ];

    await new Promise((resolve, reject) => {
      db.query(insertQuery, [values], (err, data) => {
        if (err) return ErrorResponse(res, 500, "Internal Server Error");
        resolve();
      });
    });

    SuccessResponse(res, 200, "User registered successfully");
  } catch (error) {
    ErrorResponse(res, 500, "Internal Server Error");
    console.log(error);
  }
};

module.exports = { register };
