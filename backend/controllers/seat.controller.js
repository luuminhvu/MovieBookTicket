const SuccessResponse = require("../common/Response/Success");
const ErrorResponse = require("../common/Response/Error");
const db = require("../config/dbconfig");
const getSeatOfCinemaHall = async (req, res) => {
  try {
    const q = `SELECT 
              ch.CinemaHallID,
              c.Name AS CinemaName,
              ch.Name AS CinemaHallName,
              ch.Capacity AS Capacity
          FROM 
              cinemahalls ch
          JOIN 
              cinemas c ON ch.CinemaID = c.CinemaID
          GROUP BY 
              ch.CinemaHallID;
              `;
    const data = await new Promise((resolve, reject) => {
      db.query(q, (err, result) => {
        if (err) return ErrorResponse(res, 500, "Internal Server Error", err);
        resolve(result);
      });
    });
    SuccessResponse(res, 200, "Cinema halls fetched successfully", data);
  } catch (error) {
    console.log(error);
    ErrorResponse(res, 500, "Internal Server Error", error);
  }
};
const getSeatsByCinemaHallID = async (req, res) => {
  try {
    const CinemaHallID = req.body.CinemaHallID;
    const q = `
      SELECT 
        cs.CinemaSeatID,
        cs.SeatName,
        cs.SeatType
      FROM 
        cinemaseats cs
      WHERE
        cs.CinemaHallID = ${CinemaHallID}
    `;
    const data = await new Promise((resolve, reject) => {
      db.query(q, (err, result) => {
        if (err) return ErrorResponse(res, 500, "Internal Server Error", err);
        resolve(result);
      });
    });
    SuccessResponse(res, 200, "Seats fetched successfully", data);
  } catch (error) {
    ErrorResponse(res, 500, "Internal Server Error", error);
  }
};

module.exports = { getSeatOfCinemaHall, getSeatsByCinemaHallID };
