const SuccessResponse = require("../common/Response/Success");
const ErrorResponse = require("../common/Response/Error");
const cloudinary = require("../utils/cloudinary");
const db = require("../config/dbconfig");

const getPosters = (req, res, next) => {
  try {
    const q = "SELECT * FROM `poster`";
    db.query(q, (err, data) => {
      if (err) return ErrorResponse(res, 500, "Internal Server Error", err);
      SuccessResponse(res, 200, "Posters fetched successfully", data);
    });
  } catch (error) {
    ErrorResponse(res, 500, "Internal Server Error", error);
  }
};
module.exports = {
  getPosters,
};
