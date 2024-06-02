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
const addPoster = async (req, res) => {
  try {
    const { Poster } = req.body;
    const uploadRes = await cloudinary.uploader.upload(Poster, {
      upload_preset: "MovieBookTicket",
    });

    if (uploadRes) {
      const q = `INSERT INTO poster (PosterURL, ActivePoster) VALUES ('${uploadRes.secure_url}', 1)`;

      db.query(q, (err, data) => {
        if (err) return ErrorResponse(res, 500, "Internal Server Error", err);
        const fetchNewPosterQuery = `SELECT * FROM poster WHERE PosterID = ${data.insertId}`;
        db.query(fetchNewPosterQuery, (err, result) => {
          if (err) return ErrorResponse(res, 500, "Internal Server Error", err);
          SuccessResponse(res, 200, "Thêm mới thành công", result[0]);
        });
      });
    }
  } catch (error) {
    ErrorResponse(res, 500, "Internal Server Error", error);
  }
};
const editPoster = async (req, res, next) => {
  try {
    const { PosterID } = req.body;
    const q = `UPDATE poster SET ActivePoster = !ActivePoster WHERE PosterID = ${PosterID}`;

    db.query(q, (err, data) => {
      if (err) return ErrorResponse(res, 500, "Internal Server Error", err);
      const fetchUpdatedPosterQuery = `SELECT * FROM poster WHERE PosterID = ${PosterID}`;
      db.query(fetchUpdatedPosterQuery, (err, result) => {
        if (err) return ErrorResponse(res, 500, "Internal Server Error", err);

        if (result.length > 0) {
          SuccessResponse(res, 200, "Cập nhật thành công", result[0]);
        } else {
          ErrorResponse(res, 404, "Poster not found");
        }
      });
    });
  } catch (error) {
    ErrorResponse(res, 500, "Internal Server Error", error);
  }
};
const deletePoster = async (req, res, next) => {
  try {
    const { id } = req.params;
    const q = `DELETE FROM poster WHERE PosterID = ?`;

    db.query(q, [id], (err, data) => {
      if (err) return ErrorResponse(res, 500, "Internal Server Error", err);
      if (data.affectedRows > 0) {
        SuccessResponse(res, 200, "Xoá thành công", { PosterID: id });
      } else {
        ErrorResponse(res, 404, "Poster not found");
      }
    });
  } catch (error) {
    ErrorResponse(res, 500, "Internal Server Error", error);
  }
};

module.exports = {
  getPosters,
  editPoster,
  deletePoster,
  addPoster,
};
