const db = require("../config/dbconfig");
const bcrypt = require("bcrypt");
const { genAccessToken } = require("../utils/genToken");
const SuccessResponse = require("../common/Response/Success");
const ErrorResponse = require("../common/Response/Error");
const {
  generateBookingId,
  generatePassword,
} = require("../common/fn/GenerateNumber");
const dayjs = require("dayjs");
const cloudinary = require("../utils/cloudinary");
const sendMail = require("../utils/sendMail");
const genActivationToken = require("../utils/genActivationToken");
const { SUBJECT, TEXT } = require("../common/CONSTANST");
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
    const activationToken = genActivationToken();
    const insertQuery =
      "INSERT INTO `user` (userid, username, password, email, role, dateregister, active,activationtoken,authtype) VALUES ?";
    const values = [
      [
        UserID,
        req.body.username,
        hashedPassword,
        req.body.email,
        "customer",
        date,
        0,
        activationToken,
        "default",
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
      authType: "default",
    };
    const token = genAccessToken(user);
    const to = user.email;
    const subject = SUBJECT;
    const text = TEXT;
    const activeUrl = `${process.env.HOST}/activate?token=${activationToken}`;
    const html = `
    <html>
    <head>
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f2f2f2;
        padding: 20px;
        font-size:18px;
      }
      a {
        color: green;
        text-decoration: none;
        padding: 10px 20px;
        background-color: #4CAF50;
        color: white;
        border-radius: 5px;
      }
      p{
        margin-bottom: 20px;
      }
    </style>
    </head>
    <body>
      <p>Welcome to MovieBookTicket</p>
      <p>Click the link below to activate your account</p>
      <a href="${activeUrl}">Activate</a>
    </body>
    </html>
    `;
    sendMail(to, subject, text, html);
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
      authType: user.AuthType,
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
    db.query(q, (err, data) => {
      if (err) {
        return ErrorResponse(res, 500, "Internal Server Error", err);
      }
      SuccessResponse(res, 200, "User info fetched successfully", data[0]);
    });
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
      const q = `UPDATE user SET Avatar = ? WHERE UserID = ?`;
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
    const q = `SELECT * FROM user WHERE UserID = ?`;
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
const updateUserForAdmin = async (req, res) => {
  try {
    const { FullName, Phone, Birthday, Active, UserID, Address } = req.body;
    const q = `UPDATE user SET FullName = '${FullName}', Phone = '${Phone}', Birthday = '${Birthday}', Active = '${Active}' , Address = '${Address}' WHERE UserID = ${UserID}`;
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
const activeAccount = async (req, res) => {
  console.log("Active account");
  try {
    const { token } = req.params;
    console.log(token);
    const user = await new Promise((resolve, reject) => {
      const checkQuery = `SELECT * FROM user WHERE activationtoken = '${token}'`;
      db.query(checkQuery, (err, data) => {
        if (err) return reject(err);
        resolve(data[0]);
      });
    });

    if (!user) {
      console.log("Invalid activation token");
      return ErrorResponse(
        res,
        400,
        "Invalid activation token or user has already been activated."
      );
    }

    if (user.Active === 1) {
      return ErrorResponse(res, 400, "User has already been activated.");
    }
    const updateQuery = `UPDATE user SET Active = 1, activationtoken = NULL WHERE activationtoken = '${token}'`;
    await new Promise((resolve, reject) => {
      db.query(updateQuery, (err, data) => {
        if (err) return reject(err);
        resolve(data);
      });
    });
    return SuccessResponse(res, 200, "Account activated successfully.");
  } catch (error) {
    console.error(error);
    return ErrorResponse(res, 500, "Internal Server Error");
  }
};
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await new Promise((resolve, reject) => {
      const q = `SELECT * FROM user WHERE email = ?`;
      db.query(q, [email], (err, data) => {
        if (err) return reject(err);
        resolve(data[0]);
      });
    });

    if (!user) {
      return ErrorResponse(res, 400, "User not found");
    }
    const newPassword = generatePassword(8);
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(newPassword, salt);
    const updateQuery = `UPDATE user SET Password = ? WHERE email = ?`;
    await new Promise((resolve, reject) => {
      db.query(updateQuery, [hashedPassword, email], (err, data) => {
        if (err) return reject(err);
        resolve(data);
      });
    });
    const to = email;
    const subject = "Movie Book Ticket - Forgot Password";
    const text = "Forgot Password";
    const html = `
    <html>
    <head>
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f2f2f2;
        padding: 20px;
        font-size:18px;
      }
      p{
        margin-bottom: 20px;
      }
    </style>
    </head>
    <body>
      <p>You have requested to reset your password</p>
      <p>Your new password is: ${newPassword}</p>
      <p></p>Please login and change your password</p>
    </body>
    </html>
    `;
    sendMail(to, subject, text, html);
    SuccessResponse(res, 200, "New password sent to your email");
  } catch (error) {
    console.error(error);
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
  getUser,
  updateUserForAdmin,
  activeAccount,
  forgotPassword,
};
