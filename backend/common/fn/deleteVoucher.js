const db = require("../../config/dbconfig");

const deleteUserVoucher = async (voucherId) => {
  return new Promise((resolve, reject) => {
    const deleteVoucherQuery = `DELETE FROM UserVoucher WHERE UserVoucherID = ?`;
    db.query(deleteVoucherQuery, [voucherId], (err, result) => {
      if (err) {
        return reject(err);
      }

      if (result.affectedRows === 0) {
        const error = new Error("Voucher không tồn tại");
        return reject(error);
      }
      resolve({ message: "Voucher đã được xóa thành công" });
    });
  });
};

module.exports = { deleteUserVoucher };
