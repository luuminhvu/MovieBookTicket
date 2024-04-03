const SuccessResponse = require("../common/Response/Success");
const ErrorResponse = require("../common/Response/Error");
const db = require("../config/dbconfig");
const getShowtime = async (req, res, next) => {
  try {
    const q = `SELECT 
        s.ShowtimeID,
        m.MovieID,
        m.Name AS MovieName,
        ch.CinemaHallID,
        ch.Name,
        tf.TimeFrameID,
        tf.StartTime,
        tf.EndTime,
        s.Date 
      FROM 
        showtimes s 
      JOIN 
        movies m ON s.MovieID = m.MovieID 
      JOIN 
        cinemahalls ch ON s.CinemaHallID = ch.CinemaHallID 
      JOIN 
        timeframes tf ON s.TimeFrameID = tf.TimeFrameID`;

    const data = await new Promise((resolve, reject) => {
      db.query(q, (err, data) => {
        if (err) return ErrorResponse(res, 500, "Internal Server Error", err);
        resolve(data);
      });
    });

    SuccessResponse(res, 200, "Showtime fetched successfully", data);
  } catch (error) {
    ErrorResponse(res, 500, "Internal Server Error", error);
  }
};

module.exports = { getShowtime };
