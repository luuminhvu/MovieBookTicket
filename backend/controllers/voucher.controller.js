const SuccessResponse = require("../common/Response/Success");
const ErrorResponse = require("../common/Response/Error");
const db = require("../config/dbconfig");

const getVoucher = async (req, res) => {
  try {
    const query = "SELECT * FROM Voucher";
    db.query(query, (err, result) => {
      if (err) {
        ErrorResponse(res, 500, "Internal Server Error", err);
      } else {
        SuccessResponse(res, 200, "Success", result);
      }
    });
  } catch (error) {
    ErrorResponse(res, 500, "Internal Server Error", error);
  }
};
const getVoucherByID = async (req, res) => {
  try {
    const { id } = req.params;
    const query = `
        SELECT uv.*, v.VoucherCode, v.Description, v.Discount, v.ExpiryDate, v.Active 
        FROM UserVoucher uv 
        JOIN Voucher v ON uv.VoucherID = v.VoucherID 
        WHERE uv.UserID = ?`;

    db.query(query, [id], (err, result) => {
      if (err) {
        return ErrorResponse(res, 500, "Internal Server Error", err);
      }
      if (result.length === 0) {
        return ErrorResponse(res, 404, "Voucher not found");
      }
      SuccessResponse(res, 200, "Success", result);
    });
  } catch (error) {
    ErrorResponse(res, 500, "Internal Server Error", error);
  }
};
const addVoucher = async (req, res) => {
  try {
    const { VoucherCode, Description, Discount, ExpiryDate } = req.body;
    const query =
      "INSERT INTO Voucher (VoucherCode, Description, Discount, ExpiryDate, Active) VALUES (?,?,?,?,?)";
    db.query(
      query,
      [VoucherCode, Description, Discount, ExpiryDate, 1],
      (err, result) => {
        if (err) {
          return ErrorResponse(res, 500, "Internal Server Error", err);
        }
        const insertedVoucher = {
          VoucherID: result.insertId,
          VoucherCode,
          Description,
          Discount,
          ExpiryDate,
          Active: 1,
        };
        SuccessResponse(res, 200, "Thêm Voucher thành công", insertedVoucher);
      }
    );
  } catch (error) {
    ErrorResponse(res, 500, "Internal Server Error", error);
  }
};

const updateVoucher = async (req, res) => {
  try {
    const { VoucherCode, Description, Discount, ExpiryDate, Active } = req.body;
    const { id } = req.params;
    const query =
      "UPDATE Voucher SET VoucherCode = ?, Description = ?, Discount = ?, ExpiryDate = ?, Active = ? WHERE VoucherID = ?";
    db.query(
      query,
      [VoucherCode, Description, Discount, ExpiryDate, Active, id],
      (err, result) => {
        if (err) {
          return ErrorResponse(res, 500, "Internal Server Error", err);
        }
        const updatedVoucher = {
          VoucherID: id,
          VoucherCode,
          Description,
          Discount,
          ExpiryDate,
          Active,
        };
        SuccessResponse(
          res,
          200,
          "Cập nhật Voucher thành công",
          updatedVoucher
        );
      }
    );
  } catch (error) {
    ErrorResponse(res, 500, "Internal Server Error", error);
  }
};
const deleteVoucher = async (req, res) => {
  try {
    const { id } = req.params;
    const query = "DELETE FROM Voucher WHERE VoucherID = ?";
    db.query(query, [id], (err, result) => {
      if (err) {
        return ErrorResponse(res, 500, "Internal Server Error", err);
      }
      SuccessResponse(res, 200, "Success", result);
    });
  } catch (error) {
    ErrorResponse(res, 500, "Internal Server Error", error);
  }
};
const deleteUserVoucher = async (req, res) => {
  try {
    const { id: UserVoucherID } = req.params;
    const checkQuery = `SELECT * FROM UserVoucher WHERE UserVoucherID = ?`;
    db.query(checkQuery, [UserVoucherID], (checkErr, checkResult) => {
      if (checkErr) {
        return ErrorResponse(res, 500, "Internal Server Error", checkErr);
      }
      if (checkResult.length === 0) {
        return ErrorResponse(res, 404, "User voucher not found");
      }
      const deleteQuery = `DELETE FROM UserVoucher WHERE UserVoucherID = ?`;
      db.query(deleteQuery, [UserVoucherID], (deleteErr, deleteResult) => {
        if (deleteErr) {
          return ErrorResponse(res, 500, "Internal Server Error", deleteErr);
        }
        SuccessResponse(res, 200, "User voucher deleted successfully");
      });
    });
  } catch (error) {
    ErrorResponse(res, 500, "Internal Server Error", error);
  }
};

const getAllUserVoucher = async (req, res) => {
  try {
    const query = `
        SELECT uv.*, v.VoucherCode, v.Description, v.Discount, v.ExpiryDate, v.Active, u.UserID, u.Username, u.Email 
        FROM UserVoucher uv 
        JOIN Voucher v ON uv.VoucherID = v.VoucherID
        JOIN user u ON uv.UserID = u.UserID`;

    db.query(query, (err, result) => {
      if (err) {
        return ErrorResponse(res, 500, "Internal Server Error", err);
      }
      const groupedResult = result.reduce((acc, curr) => {
        const { UserID, Email, ...voucherDetails } = curr;
        if (!acc[UserID]) {
          acc[UserID] = {
            UserID,
            Email,
            Vouchers: [],
          };
        }
        acc[UserID].Vouchers.push(voucherDetails);
        return acc;
      }, {});

      // Chuyển đối tượng thành mảng
      const groupedArray = Object.values(groupedResult);

      SuccessResponse(res, 200, "Success", groupedArray);
    });
  } catch (error) {
    ErrorResponse(res, 500, "Internal Server Error", error);
  }
};
const addVoucherToUser = async (req, res) => {
  try {
    const { UserID, VoucherID } = req.body;

    if (UserID === "all") {
      const getAllUsersQuery = `SELECT UserID FROM user`;
      db.query(getAllUsersQuery, (fetchUsersErr, fetchUsersResult) => {
        if (fetchUsersErr) {
          return ErrorResponse(
            res,
            500,
            "Internal Server Error",
            fetchUsersErr
          );
        }
        const userIDs = fetchUsersResult.map((user) => user.UserID);
        const insertPromises = userIDs.map((userId) => {
          return new Promise((resolve, reject) => {
            const checkQuery = `SELECT * FROM UserVoucher WHERE UserID = ? AND VoucherID = ?`;
            db.query(
              checkQuery,
              [userId, VoucherID],
              (checkErr, checkResult) => {
                if (checkErr) {
                  return reject(checkErr);
                }
                if (checkResult.length > 0) {
                  return resolve();
                }

                const insertQuery = `INSERT INTO UserVoucher (UserID, VoucherID) VALUES (?, ?)`;
                db.query(
                  insertQuery,
                  [userId, VoucherID],
                  (insertErr, insertResult) => {
                    if (insertErr) {
                      return reject(insertErr);
                    }
                    resolve();
                  }
                );
              }
            );
          });
        });

        Promise.all(insertPromises)
          .then(() => {
            SuccessResponse(
              res,
              200,
              "Voucher added to all users successfully"
            );
          })
          .catch((error) => {
            ErrorResponse(res, 500, "Internal Server Error", error);
          });
      });
    } else {
      const checkQuery = `SELECT * FROM UserVoucher WHERE UserID = ? AND VoucherID = ?`;
      db.query(checkQuery, [UserID, VoucherID], (checkErr, checkResult) => {
        if (checkErr) {
          return ErrorResponse(res, 500, "Internal Server Error", checkErr);
        }
        if (checkResult.length > 0) {
          return ErrorResponse(res, 400, "Voucher already added to user");
        }
        const insertQuery = `INSERT INTO UserVoucher (UserID, VoucherID) VALUES (?, ?)`;
        db.query(
          insertQuery,
          [UserID, VoucherID],
          (insertErr, insertResult) => {
            if (insertErr) {
              return ErrorResponse(
                res,
                500,
                "Internal Server Error",
                insertErr
              );
            }
            SuccessResponse(res, 200, "Voucher added to user successfully");
          }
        );
      });
    }
  } catch (error) {
    ErrorResponse(res, 500, "Internal Server Error", error);
  }
};

module.exports = {
  getVoucher,
  getVoucherByID,
  addVoucher,
  updateVoucher,
  deleteVoucher,
  deleteUserVoucher,
  getAllUserVoucher,
  addVoucherToUser,
};
