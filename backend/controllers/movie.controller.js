const SuccessResponse = require("../common/Response/Success");
const ErrorResponse = require("../common/Response/Error");
const db = require("../config/dbconfig");
const getMovies = async (req, res) => {
  try {
    const q = "SELECT * FROM `movies`";
    const data = await new Promise((resolve, reject) => {
      db.query(q, (err, data) => {
        if (err) return ErrorResponse(res, 500, "Internal Server Error", err);
        resolve(data);
      });
    });
    SuccessResponse(res, 200, "Movies fetched successfully", data);
  } catch (error) {
    ErrorResponse(res, 500, "Internal Server Error", error);
  }
};
module.exports = { getMovies };
