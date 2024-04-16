const SuccessResponse = require("../common/Response/Success");
const ErrorResponse = require("../common/Response/Error");
const db = require("../config/dbconfig");
const getSeatOfCinemaHall = async (req, res) => {
  try {
    const q = `SELECT ch.CinemaHallID, 
                        IFNULL(CONCAT('[', GROUP_CONCAT(
                          JSON_OBJECT('CinemaSeatID', IFNULL(cs.CinemaSeatID, ''), 
                                      'SeatName', IFNULL(cs.SeatName, ''), 
                                      'SeatType', IFNULL(cs.SeatType, ''))), ']'), '[]') AS Seats, 
                        c.Name AS CinemaName, 
                        ch.Name AS CinemaHallName
                  FROM cinemahalls ch
                  JOIN cinemas c ON ch.CinemaID = c.CinemaID
                  LEFT JOIN cinemaseats cs ON ch.CinemaHallID = cs.CinemaHallID
                  GROUP BY ch.CinemaHallID`;

    const data = await new Promise((resolve, reject) => {
      db.query(q, (err, data) => {
        if (err) return ErrorResponse(res, 500, "Internal Server Error", err);
        resolve(data);
      });
    });
    data.forEach((row) => {
      row.Seats = JSON.parse(row.Seats);
    });
    SuccessResponse(res, 200, "Seats fetched successfully", data);
  } catch (error) {
    ErrorResponse(res, 500, "Internal Server Error", error);
  }
};

module.exports = { getSeatOfCinemaHall };
