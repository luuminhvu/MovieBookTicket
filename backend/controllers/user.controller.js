const db = require("../config/dbconfig");
const bcrypt = require("bcrypt");
const { genAccessToken } = require("../utils/genToken");
const SuccessResponse = require("../common/Response/Success");
const ErrorResponse = require("../common/Response/Error");
const { generateBookingId } = require("../common/fn/GenerateNumber");
const dayjs = require("dayjs");
const cloudinary = require("../utils/cloudinary");
const register = async (req, res) => {
  try {
    const q = "SELECT * FROM `user` WHERE email = ? OR username = ?";
    const data = await new Promise((resolve, reject) => {
      db.query(q, [req.body.email, req.body.username], (err, data) => {
        if (err) {
          console.log(err);
          return ErrorResponse(res, 500, "Internal Server Error");
        }
        resolve(data);
      });
    });

    if (data.length > 0) {
      return ErrorResponse(res, 400, "User already exists");
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);
    const UserID = generateBookingId(8);
    const date = dayjs().format("YYYY-MM-DD");
    const insertQuery =
      "INSERT INTO `user` (userid, username, password, email, role, dateregister) VALUES ?";
    const values = [
      [
        UserID,
        req.body.username,
        hashedPassword,
        req.body.email,
        "customer",
        date,
      ],
    ];

    await new Promise((resolve, reject) => {
      db.query(insertQuery, [values], (err, data) => {
        if (err) {
          console.log(err);
          return ErrorResponse(res, 500, "Internal Server Error");
        }
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
const updateUserInfo = async (req, res) => {
  try {
    const UserID = req.body.id;
    const { name, phone, address, dob, description } = req.body.user;
    const q = `UPDATE user SET FullName = '${name}', Phone = '${phone}', Address = '${address}', Birthday = '${dob}', Description = '${description}' WHERE UserID = ${UserID}`;
    await new Promise((resolve, reject) => {
      db.query(q, (err, data) => {
        if (err) return ErrorResponse(res, 500, "Internal Server Error", err);
        resolve(data);
      });
    });
    SuccessResponse(res, 200, "User info updated successfully");
  } catch (error) {
    ErrorResponse(res, 500, "Internal Server Error");
  }
};
const updateAvatarUser = async (req, res) => {
  const { id: UserID, avatar } = req.body;
  try {
    const uploadRes = await cloudinary.uploader.upload(avatar, {
      upload_preset: "MovieBookTicket",
    });

    if (uploadRes) {
      const q = `UPDATE USER SET Avatar = ? WHERE UserID = ?`;
      db.query(q, [uploadRes.secure_url, UserID], (err, data) => {
        if (err) {
          return ErrorResponse(res, 500, "Internal Server Error", err);
        }
        SuccessResponse(res, 200, "User avatar updated successfully");
      });
    } else {
      ErrorResponse(res, 500, "Internal Server Error");
    }
  } catch (error) {
    ErrorResponse(res, 500, "Internal Server Error");
  }
};
const updateUserPassword = async (req, res) => {
  const { id: UserID, user } = req.body;
  const currentPassword = user.currentPassword;
  const newPassword = user.newPassword;
  try {
    const q = `SELECT * FROM User WHERE UserID = ?`;
    const user = await new Promise((resolve, reject) => {
      db.query(q, [UserID], (err, data) => {
        if (err) {
          return ErrorResponse(res, 500, "Internal Server Error", err);
        }
        resolve(data[0]);
      });
    });
    if (!user) {
      return ErrorResponse(res, 400, "User not found");
    }
    const validPassword = bcrypt.compareSync(currentPassword, user.Password);
    if (!validPassword) {
      return ErrorResponse(res, 400, "Invalid password");
    }
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(newPassword, salt);
    const qUpdate = `UPDATE User SET Password = ? WHERE UserID = ?`;
    db.query(qUpdate, [hashedPassword, UserID], (err, data) => {
      if (err) {
        return ErrorResponse(res, 500, "Internal Server Error", err);
      }
      return SuccessResponse(res, 200, "Password updated successfully");
    });
  } catch (error) {
    console.error(error);
    ErrorResponse(res, 500, "Internal Server Error");
  }
};
const getUser = async (req, res) => {
  try {
    const q = "SELECT * FROM user";
    const data = await new Promise((resolve, reject) => {
      db.query(q, (err, data) => {
        if (err) return ErrorResponse(res, 500, "Internal Server Error", err);
        resolve(data);
      });
    });
    SuccessResponse(res, 200, "User fetched successfully", data);
  } catch (error) {
    ErrorResponse(res, 500, "Internal Server Error");
  }
};
module.exports = {
  register,
  login,
  getUserInfo,
  updateUserInfo,
  updateAvatarUser,
  updateUserPassword,
};
