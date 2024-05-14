const SuccessResponse = require("../common/Response/Success");
const ErrorResponse = require("../common/Response/Error");
const db = require("../config/dbconfig");
const getShowtime = async (req, res, next) => {
  try {
    const q = `SELECT 
        s.ShowtimeID,
        m.MovieID,
        m.Name AS MovieName,
        c.CinemaID,
        c.Name as CinemaName,
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
        cinemas c ON ch.CinemaID = c.CinemaID
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
const addShow = async (req, res) => {
  try {
    const { MovieID, CinemaHallID, TimeFrameID, Date } = req.body;
    const q1 = `INSERT INTO showtimes(MovieID, CinemaHallID, TimeFrameID, Date) VALUES(${MovieID}, ${CinemaHallID}, ${TimeFrameID}, '${Date}')`;

    const result1 = await new Promise((resolve, reject) => {
      db.query(q1, (err, result) => {
        if (err) console.log(err);
        else resolve(result);
      });
    });

    const showtimeId = result1.insertId;
    console.log("Oke result1: " + result1.insertId);
    const q2 = `SELECT CinemaSeatID, SeatType FROM cinemaseats WHERE CinemaHallID = ${CinemaHallID}`;
    const seatResult = await new Promise((resolve, reject) => {
      db.query(q2, (err, result) => {
        if (err) console.log(err);
        else resolve(result);
      });
    });

    const values = seatResult
      .map((seat) => {
        let price = 0;
        if (seat.SeatType === "Normal") {
          price = 50000;
        } else if (seat.SeatType === "VIP") {
          price = 55000;
        }
        return `(${showtimeId}, ${seat.CinemaSeatID}, NULL, 'EMPTY', ${price})`;
      })
      .join(",");

    const q3 = `INSERT INTO showseats (ShowtimeID, CinemaSeatID, BookingID, SeatStatus, Price) VALUES ${values}`;

    const result3 = await new Promise((resolve, reject) => {
      db.query(q3, (err, result) => {
        if (err) console.log(err);
        else resolve(result);
      });
    });

    SuccessResponse(res, 200, "Showtime added successfully", result3);
  } catch (error) {
    ErrorResponse(res, 500, "Internal Server Error", error);
  }
};

const editShow = async (req, res) => {
  try {
    const { ShowtimeID, MovieID, CinemaHallID, TimeFrameID, Date } = req.body;
    const q = `UPDATE showtimes SET MovieID = ${MovieID}, CinemaHallID = ${CinemaHallID}, TimeFrameID = ${TimeFrameID}, Date = '${Date}' WHERE ShowtimeID = ${ShowtimeID}`;
    db.query(q, (err, result) => {
      if (err) return ErrorResponse(res, 500, "Internal Server Error", err);
      SuccessResponse(res, 200, "Showtime updated successfully", result);
    });
  } catch (error) {
    ErrorResponse(res, 500, "Internal Server Error", error);
  }
};

module.exports = { getShowtime, addShow, editShow };
