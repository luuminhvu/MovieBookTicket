const SuccessResponse = require("../common/Response/Success");
const ErrorResponse = require("../common/Response/Error");
const db = require("../config/dbconfig");

const getCinemaShowMovie = async (req, res, next) => {
  try {
    const date = req.body.date;
    const MovieID = req.body.MovieID;
    const q =
      "SELECT c.Name as CinemaName, ch.Name as CinemaHallName, st.MovieID, tf.StartTime as StartTime FROM `showtimes` as st JOIN `cinemahalls` as ch ON st.CinemaHallID = ch.CinemaHallID JOIN `cinemas` as c ON ch.CinemaID = c.CinemaID JOIN `timeframes` as tf ON st.TimeFrameID = tf.TimeFrameID WHERE st.MovieID = ? AND DATE(st.Date) = ?";
    const rows = await new Promise((resolve, reject) => {
      db.query(q, [MovieID, date], (err, data) => {
        if (err) return ErrorResponse(res, 500, "Internal Server Error", err);
        resolve(data);
      });
    });
    const groupedData = {};
    rows.forEach((row) => {
      if (!groupedData[row.CinemaName]) {
        groupedData[row.CinemaName] = [];
      }
      groupedData[row.CinemaName].push({
        CinemaHallName: row.CinemaHallName,
        StartTime: row.StartTime,
      });
    });

    const responseData = Object.keys(groupedData).map((cinemaName) => ({
      CinemaName: cinemaName,
      Showtimes: groupedData[cinemaName],
    }));

    SuccessResponse(res, 200, "Showtimes fetched successfully", responseData);
  } catch (error) {
    ErrorResponse(res, 500, "Internal Server Error", error);
  }
};
const getSeatForBooking = async (req, res, next) => {
  try {
    const ShowtimeID = req.body.ShowtimeID;

    const q =
      "SELECT ss.ShowSeatID,cs.SeatName,cs.SeatType,ss.SeatStatus,ss.Price FROM cinemaseats cs JOIN showseats ss ON cs.CinemaSeatID = ss.CinemaSeatID WHERE ss.ShowtimeID = ?";

    const rows = await new Promise((resolve, reject) => {
      db.query(q, [ShowtimeID], (err, data) => {
        if (err) return ErrorResponse(res, 500, "Internal Server Error", err);
        resolve(data);
      });
    });

    SuccessResponse(res, 200, "Seats fetched successfully", rows);
  } catch (error) {
    ErrorResponse(res, 500, "Internal Server Error", error);
  }
};

module.exports = { getCinemaShowMovie, getSeatForBooking };
