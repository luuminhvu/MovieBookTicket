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
const getCinemaHall = async (req, res) => {
  try {
    const q =
      "SELECT cinemas.CinemaID, cinemas.Name AS CinemaName, cinemahalls.* FROM cinemahalls INNER JOIN cinemas ON cinemahalls.CinemaID = cinemas.CinemaID";
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
const editCinema = async (req, res) => {
  try {
    const { CinemaID, Name, Location } = req.body;
    const updateQuery = `UPDATE cinemas SET Name = '${Name}', Location = '${Location}' WHERE CinemaID = ${CinemaID}`;
    db.query(updateQuery, (err, data) => {
      if (err) return ErrorResponse(res, 500, "Internal Server Error", err);
      const selectQuery = `SELECT * FROM cinemas WHERE CinemaID = ${CinemaID}`;
      db.query(selectQuery, (err, data) => {
        if (err) return ErrorResponse(res, 500, "Internal Server Error", err);
        console.log(data);
        SuccessResponse(res, 200, "Cinema updated successfully", data[0]);
      });
    });
  } catch (error) {
    ErrorResponse(res, 500, "Internal Server Error", error);
  }
};
const addCinemaHall = async (req, res) => {
  try {
    const { CinemaID, Name, Capacity } = req.body;
    const insertQuery = `INSERT INTO cinemahalls (CinemaID, Name, Capacity) VALUES (${CinemaID}, '${Name}', ${Capacity})`;
    db.query(insertQuery, (err, data) => {
      if (err) return ErrorResponse(res, 500, "Internal Server Error", err);
      const cinemaHallID = data.insertId;
      const selectQuery = `SELECT cinemas.CinemaID, cinemas.Name AS CinemaName, cinemahalls.* FROM cinemahalls INNER JOIN cinemas ON cinemahalls.CinemaID = cinemas.CinemaID WHERE cinemahalls.CinemaHallID = ${cinemaHallID}`;
      db.query(selectQuery, (err, data) => {
        if (err) return ErrorResponse(res, 500, "Internal Server Error", err);
        SuccessResponse(res, 200, "Cinema hall added successfully", data[0]);
      });
    });
  } catch (error) {
    ErrorResponse(res, 500, "Internal Server Error", error);
  }
};
const editCinemaHall = async (req, res) => {
  try {
    const { CinemaHallID, CinemaID, Name, Capacity } = req.body;
    const updateQuery = `UPDATE cinemahalls SET CinemaID = ${CinemaID}, Name = '${Name}', Capacity = ${Capacity} WHERE CinemaHallID = ${CinemaHallID}`;
    db.query(updateQuery, (err, data) => {
      if (err) return ErrorResponse(res, 500, "Internal Server Error", err);
      const selectQuery = `SELECT cinemas.CinemaID, cinemas.Name AS CinemaName, cinemahalls.* FROM cinemahalls INNER JOIN cinemas ON cinemahalls.CinemaID = cinemas.CinemaID WHERE cinemahalls.CinemaHallID = ${CinemaHallID}`;
      db.query(selectQuery, (err, data) => {
        if (err) return ErrorResponse(res, 500, "Internal Server Error", err);
        SuccessResponse(res, 200, "Cinema hall updated successfully", data[0]);
      });
    });
  } catch (error) {
    ErrorResponse(res, 500, "Internal Server Error", error);
  }
};

module.exports = {
  getCinemas,
  getCinemaHall,
  getCinemaHallByCinemaID,
  addCinema,
  editCinema,
  addCinemaHall,
  editCinemaHall,
};
