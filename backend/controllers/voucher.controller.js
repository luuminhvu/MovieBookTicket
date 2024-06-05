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
    const { userId, voucherId } = req.body;
    const checkQuery = `SELECT * FROM UserVoucher WHERE UserID = ? AND VoucherID = ?`;
    db.query(checkQuery, [userId, voucherId], (checkErr, checkResult) => {
      if (checkErr) {
        return ErrorResponse(res, 500, "Internal Server Error", checkErr);
      }
      if (checkResult.length === 0) {
        return ErrorResponse(res, 404, "Voucher not found for this user");
      }

      const deleteQuery = `DELETE FROM UserVoucher WHERE UserID = ? AND VoucherID = ?`;
      db.query(deleteQuery, [userId, voucherId], (deleteErr, deleteResult) => {
        if (deleteErr) {
          return ErrorResponse(res, 500, "Internal Server Error", deleteErr);
        }
        SuccessResponse(res, 200, "Voucher deleted successfully");
      });
    });
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
};
