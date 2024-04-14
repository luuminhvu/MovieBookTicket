const SuccessResponse = require("../common/Response/Success");
const ErrorResponse = require("../common/Response/Error");
const db = require("../config/dbconfig");

const getCinemas = async (req, res) => {
  try {
    const q = "SELECT * FROM `cinemas`";
    const data = await new Promise((resolve, reject) => {
      db.query(q, (err, data) => {
        if (err) return ErrorResponse(res, 500, "Internal Server Error", err);
        resolve(data);
      });
    });
    SuccessResponse(res, 200, "Cinemas fetched successfully", data);
  } catch (error) {
    ErrorResponse(res, 500, "Internal Server Error", error);
  }
};
const getCinemaHallByCinemaID = async (req, res, next) => {
  try {
    const { CinemaID } = req.body;
    const q = `SELECT * FROM cinemahalls WHERE CinemaID = ${CinemaID}`;
    const data = await new Promise((resolve, reject) => {
      db.query(q, (err, data) => {
        if (err) return ErrorResponse(res, 500, "Internal Server Error", err);
        resolve(data);
      });
    });
    SuccessResponse(res, 200, "Cinema halls fetched successfully", data);
  } catch (error) {
    ErrorResponse(res, 500, "Internal Server Error", error);
  }
};
const addCinema = async (req, res) => {
  try {
    console.log(req.body);
    const { Name, Location } = req.body;
    const insertQuery = `INSERT INTO cinemas (Name, Location, ProvinceID) VALUES ('${Name}', '${Location}', 1)`;
    db.query(insertQuery, (err, data) => {
      if (err) return ErrorResponse(res, 500, "Internal Server Error", err);
      const cinemaID = data.insertId;
      const selectQuery = `SELECT * FROM cinemas WHERE CinemaID = ${cinemaID}`;
      db.query(selectQuery, (err, data) => {
        if (err) return ErrorResponse(res, 500, "Internal Server Error", err);
        SuccessResponse(res, 200, "Cinema added successfully", data);
      });
    });
  } catch (error) {
    ErrorResponse(res, 500, "Internal Server Error", error);
  }
};

module.exports = { getCinemas, getCinemaHallByCinemaID, addCinema };
